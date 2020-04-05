import { st } from "springtype/core";
import { component } from "springtype/web/component";
import { Route, RouteList } from "springtype/web/router";
import { tsx } from "springtype/web/vdom/tsx";
import { InputPage } from "./page/input";
import { TextAreaPage } from "./page/text-area";
import { Center } from "./center";
import { ModalPage } from "./page/modal";
import { CardPage } from "./page/card";
import { CheckboxPage } from "./page/checkbox";
import { LoadingIndicatorPage } from "./page/loading-indicator";
import { LoaderCirclePage } from "./page/loader-circle";

@component
export class Main extends st.component {
    render() {
        return <div>
            <RouteList>
                <Route path={['', '*']}>
                    <div class={['container']}>
                        <div class={['row']}>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'input'
                                    }}>Mat-Input</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'text-area'
                                    }}>Mat-TextArea</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'modal'
                                    }}>Mat-Modal</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'card'
                                    }}>Mat-Card</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'checkbox'
                                    }}>Mat-Checkbox</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'loading-indicator'
                                    }}>Mat-Loading-Indicator</a>
                                </Center>
                            </div>
                            <div class={['col', 's12']}><br />
                                <Center>
                                    <a class="btn" href="javascript:" onClick={() => st.route = {
                                        path: 'loader-circle'
                                    }}>Mat-Loader-Circle</a>
                                </Center>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path={['input']}>
                    <InputPage />
                </Route>
                <Route path={'text-area'}>
                    <TextAreaPage />
                </Route>
                <Route path={'modal'}>
                    <ModalPage />
                </Route>
                <Route path={'card'}>
                    <CardPage />
                </Route>
                <Route path={'checkbox'}>
                    <CheckboxPage />
                </Route>
                <Route path={'loading-indicator'}>
                    <LoadingIndicatorPage />
                </Route>
                <Route path={'loader-circle'}>
                    <LoaderCirclePage />
                </Route>
            </RouteList>
        </div>
    }
}