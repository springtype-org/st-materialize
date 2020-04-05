import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {Route, RouteList} from "springtype/web/router";
import {tsx} from "springtype/web/vdom/tsx";
import {InputPage} from "./page/input";
import {TextAreaPage} from "./page/text-area";
import {Center} from "./center";

@component
export class Main extends st.component {
    render() {
        return <div>
            <RouteList>
                <Route path={['', '*']}>
                    <div class={['container']}>
                        <div class={['row']}>
                            <div class={['col', 's12']}><br/>
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'input'
                                    }}>Mat-Input</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br/>
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'text-area'
                                    }}>Mat-TextArea</a>
                                </Center>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path={['input']}>
                    <InputPage/>
                </Route>
                <Route path={'text-area'}>
                    <TextAreaPage/>
                </Route>
            </RouteList>
        </div>
    }
}