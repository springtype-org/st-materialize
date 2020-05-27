import {st} from "springtype/core";
import {IEventListener, ILifecycle} from "springtype/web/component/interface";
import {attr, component, event} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";

export interface TabClickDetail {
    tab: MatTab,

}

export interface IAttrMatTab {
    label: string;
    dataId: string;
    active?: boolean;
    onTabClick?: IEventListener<TabClickDetail>;
}

@component
export class MatTab extends st.component<IAttrMatTab> implements ILifecycle {

    @attr
    active: boolean = false;

    @attr
    label: string = '';

    @attr
    dataId: string = '';

    @ref
    anchorRef!: HTMLElement;

    @event
    onTabClick!: IEventListener<TabClickDetail>;

    dispatchTabClick = (detail: TabClickDetail) => {
        this.dispatchEvent<TabClickDetail>("tabClick", {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: {
                ...detail
            },
        });
    };

    tag = "li"
    class = ['tab']

    tabActive = false;

    render() {
        return <a onClick={() => {
            {
                this.onAnchorClick()
            }
        }} ref={{anchorRef: this}} class={this.getAnchorClasses()} href="javascript:">{this.label}</a>
    }

    onAfterElCreate(): void {
        this.tabActive = this.active;
    }


    getAnchorClasses() {
        const classes: Array<string> = [];
        if (this.tabActive) {
            classes.push('active')
        }
        return classes;
    }

    setActive(active: boolean) {
        this.tabActive = active;
        this.anchorRef.setAttribute('class', this.getAnchorClasses().join(' '));
    }

    onAnchorClick() {
        if (!this.disabled) {
            this.dispatchTabClick({tab: this});
        }
    }
}