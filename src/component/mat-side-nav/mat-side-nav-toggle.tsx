import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";
import {MatSideNav} from "./mat-side-nav";
import {IElement} from "springtype/web/vdom/interface";

export interface IAttrMatSideNavToggle {
    defaultToggle?: boolean;
}

@component
export class MatSideNavToggle extends st.component<IAttrMatSideNavToggle> implements ILifecycle {

    static TOGGLE_ACTIVE_SLOT_NAME = 'TOGGLE_ACTIVE_SLOT_NAME';
    static TOGGLE_INACTIVE_SLOT_NAME = 'TOGGLE_INACTIVE_SLOT_NAME';

    @attr
    defaultToggle: boolean = true;

    @ref
    toggleActiveSlotRef: HTMLDivElement;

    @ref
    toggleInactiveSlotRef: HTMLDivElement;

    sideNav: MatSideNav;

    toggled: boolean;

    render() {
        return <a class={["navbar-toggler"]} href="javascript:void(0)" onClick={(evt) => {
            evt.stopPropagation();
            this.toggle()
        }}>
            <span ref={{toggleActiveSlotRef: this}}
                  style={this.getToggleActiveSlotStyle()}>
                {this.renderSlot(MatSideNavToggle.TOGGLE_ACTIVE_SLOT_NAME)}
            </span>
            <span ref={{toggleInactiveSlotRef: this}}
                  style={this.getToggleInactiveSlotStyle()}>
                {this.renderSlot(MatSideNavToggle.TOGGLE_INACTIVE_SLOT_NAME)}
            </span>
        </a>
    }

    onAfterElCreate(el: IElement): void {
        super.onAfterElCreate(el);
        let parent: ILifecycle = this;

        while (parent.parent) {
            parent = parent.parent;
            if (parent instanceof MatSideNav) {
                this.sideNav = parent;
            }
        }

        if (!this.sideNav) {
            st.error('error toggle component cannot find MatSideNav')
        }
        this.toggled = this.defaultToggle;
        this.sideNav.setLocked(this.toggled);
    }

    onAfterInitialRender(): void {
        super.onAfterInitialRender();
    }

    getToggleActiveSlotStyle() {
        return `display: ${this.toggled ? 'block' : 'none'};`;
    }

    getToggleInactiveSlotStyle() {
        return `display: ${this.toggled ? 'none' : 'block'};`;
    }

    toggle() {
        this.toggled = !this.toggled;
        this.toggleActiveSlotRef.setAttribute('style', this.getToggleActiveSlotStyle());
        this.toggleInactiveSlotRef.setAttribute('style', this.getToggleInactiveSlotStyle());
        this.sideNav.setLocked(this.toggled);
    }


}