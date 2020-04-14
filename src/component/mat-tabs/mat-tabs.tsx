import {st} from "springtype/core";
import {IEvent, IEventListener, ILifecycle} from "springtype/web/component/interface";
import {component} from "springtype/web/component";
import {MatTab, TabClickDetail} from "./mat-tab";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";

export const TABS_PROPERTY_KEY = "TABS_PROPERTY_KEY";

export interface IAttrMatTabs {
    onTabClick?: IEventListener<TabClickDetail>;
}

@component
export class MatTabs extends st.component<IAttrMatTabs> implements ILifecycle {

    @ref
    indicatorRef!: HTMLElement;

    tag = "ul"

    class = ['tabs']

    tabs: Array<MatTab> = []

    activeTab!: MatTab;

    render() {
        return <fragment>
            {this.renderChildren()}
            <li ref={{indicatorRef: this}} class="indicator"/>
        </fragment>
    }

    onAfterElCreate(): void {
        this.el.addEventListener('tabclick', this.onTabActivation);
    }

    onConnect(): void {
        window.addEventListener('resize', this.onResize)
    }

    onDisconnect(): void {
        window.removeEventListener('resize', this.onResize)
    }

    onAfterRender(): void {
        this.tabs = [];
        let firstChild: MatTab | null = null;
        for (const child of this.childComponents) {
            if (child instanceof MatTab) {
                if (!firstChild) {
                    firstChild = child;
                }
                (child.el as any)[TABS_PROPERTY_KEY] = this;
                if (child.tabActive) {
                    this.activeTab = child;
                }
                this.tabs.push(child);
            }
        }
        if (!this.activeTab && firstChild) {
            this.activeTab = firstChild;
            this.activeTab.setActive(true);
        }

        if (this.activeTab) {
            this.activateTab(this.activeTab, true);
        }
    }

    onTabActivation = (evt: Event) => {
        const event = evt as IEvent<TabClickDetail>;
        const detail = event.detail as TabClickDetail;
        if (this.activeTab !== detail.tab) {
            this.activateTab(this.activeTab, false);
            this.activeTab.setActive(false);
            this.activeTab = detail.tab;
            detail.tab.setActive(true);
            this.activateTab(detail.tab, true);
        }
    }

    activateTab(tab: MatTab, activate: boolean) {
        requestAnimationFrame(() => {
            this.resize(tab);
            const activeContainer = document.querySelector('[data-tab-id=' + tab.dataId + ']');
            if (activeContainer) {
                if (activate) {
                    activeContainer.classList.remove('hide');
                } else {
                    activeContainer.classList.add('hide');
                }
            }
        })
    }

    resize(tab: MatTab) {
        const offsetLeft = tab.el.offsetLeft;
        const tabBounding = tab.el.getBoundingClientRect();
        this.indicatorRef.setAttribute('style', `left: ${offsetLeft}px; width: ${tabBounding.width}px;`)
    }

    onResize =() => {
            console.log('onREsize')
        if (this.activeTab) {
            this.resize(this.activeTab)
        }
    }
}