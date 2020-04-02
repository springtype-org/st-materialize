import {st} from "springtype/core";
import {ILifecycle} from "springtype/web/component/interface";
import {attr, component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {ref} from "springtype/core/ref";
import {MatDropdownContent} from "./mat-dropdown-content";

export interface IAttrMatDropdown {
    width?: number;
    position?: 'left' | 'right';
}


@component({tag: 'li'})
export class MatDropdown extends st.component<IAttrMatDropdown> implements ILifecycle {
    static DROPDOWN_CONTENT_SLOT_NAME = "DROPDOWN_CONTENT_SLOT_NAME";

    @attr
    width: number = 160;

    @attr
    position: 'left' | 'right' = 'right';

    @ref
    dropDownContentRef: MatDropdownContent;

    tabIndex = "0";

    render() {
        return <fragment>
            <li onClick={() => {
                this.toggle()
            }}>
                {this.renderChildren()}
            </li>
            <MatDropdownContent ref={{dropDownContentRef: this}} onClick={() => this.toggle}>
                {this.renderSlot(MatDropdown.DROPDOWN_CONTENT_SLOT_NAME)}
            </MatDropdownContent>
        </fragment>

    }

    onConnect(): void {
        super.onConnect();
        window.addEventListener('resize', this.onResize)
    }

    onDisconnect(): void {
        super.onDisconnect();
        window.removeEventListener('resize', this.onResize)
    }


    toggle() {
        this.onResize();
        this.dropDownContentRef.el.classList.toggle('show');
    }

    onResize = () => {
        if (this.INTERNAL.notInitialRender) {
            const boundingDropdown = this.el.getBoundingClientRect();
            const widthAndTopStyle = `width: ${this.width}px !important; top: ${boundingDropdown.height}px;`;
            let left;
            if (this.position == 'right') {
                const boundingDocument = document.documentElement.getBoundingClientRect();
                left = `${boundingDropdown.right - (boundingDocument.width - boundingDropdown.right) - this.width}px`;
            } else {
                left = 'unset';
            }
            this.dropDownContentRef.el.setAttribute('style',
                `left: ${left}!important; ${widthAndTopStyle}`
            );
        }
    }
}