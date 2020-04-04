import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {Route, RouteList} from "springtype/web/router";
import { tsx } from "springtype/web/vdom/tsx";
import {InputPage} from "./page/input";

@component
export class Main extends st.component {

    render() {
        return <RouteList>
            <Route path={''}>
                <InputPage/>
            </Route>
        </RouteList>;
    }
}