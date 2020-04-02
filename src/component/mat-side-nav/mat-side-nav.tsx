import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {component} from "springtype/web/component";


@component({tag: 'aside'})
export class MatSideNav extends st.component implements ILifecycle {

    class = ["sidenav-main", "nav-collapsible", "sidenav-dark"];

    locked = true;
    initial = true;

    render() {
        return this.renderChildren();
    }

    setLocked(locked: boolean) {
        this.locked = locked;
        if (this.initial) {
            this.initial = false;
            this.onMouseOut()
        }
        if (locked) {
            this.el.classList.add('nav-lock');
        } else {
            this.el.classList.remove('nav-lock');
        }
    }

    onAfterInitialRender(): void {
        super.onAfterInitialRender();
    }

    onAfterElCreate(): void {
        this.el.addEventListener("mouseover", () => {
            this.onMouseOver()
        });

        this.el.addEventListener("mouseout", () => {
            this.onMouseOut()
        });
    }

    onMouseOver() {
        if (!this.locked) {
            this.el.classList.add("nav-expanded");
            this.el.classList.remove("nav-collapsed");
        }
    }

    onMouseOut() {
        if (!this.locked) {
            this.el.classList.remove("nav-expanded");
            this.el.classList.add("nav-collapsed");
        }
    }
}