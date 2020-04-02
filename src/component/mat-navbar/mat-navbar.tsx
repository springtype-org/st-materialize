import "./mat-navbar.scss"
import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {tsx} from "springtype/web/vdom";
import {attr, component} from "springtype/web/component";
import {ref} from "springtype/core/ref";

export interface IAttrMatNavbar {
    position?: 'left' | 'right';
    light?: boolean;
}


@component({tag: 'div'})
export class MatNavbar extends st.component<IAttrMatNavbar> implements ILifecycle {

    @attr
    position: 'left' | 'right' = 'right';

    @attr
    light: boolean = true;

    @ref
    dropDownContentRef: HTMLUListElement;

    @ref
    dropDownLiRef: HTMLLIElement;

    class = ["navbar"];


    render() {
        return <nav
            class={["navbar-main", "navbar-color", "nav-collapsible", "sideNav-lock", this.light ? 'navbar-light' : '']}>
            <div class={["nav-wrapper"]}>
                <ul class={["navbar-list", this.position]}>
                    {this.renderChildren()}
                </ul>
            </div>
        </nav>
    }

}