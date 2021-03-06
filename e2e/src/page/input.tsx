import {st} from "springtype/core";
import {component} from "springtype/web/component";
import {tsx} from "springtype/web/vdom";
import {
    LOWERCASE,
    lowercase,
    MIN_LENGTH,
    minLength,
    NUMBER,
    number,
    REQUIRED,
    required,
    SPECIAL,
    special,
    UPPERCASE,
    uppercase, validatorNameFactory
} from "st-validate";
import {Container} from "../cmp/container";
import {ref} from "springtype/core/ref";
import {MatIcon, MatInput} from "../../../src/component";
import {resolveRequire} from "../../../src/component/function/resolve-require";
import {Form} from "st-form";

@component
export class InputPage extends st.component {
    @ref
    formRef!: Form;

    @ref
    inputTextRef!: MatInput;

    @ref
    passwordInputRef!: MatInput;

    @ref
    passwordRepeatInputRef!: MatInput;

    @ref
    inputDateRef!: MatInput;

    render() {
        return <div class={'container'}>
            <Form ref={{formRef: this}}>
                <div class={'row'}>
                    <div class={['col', 's12']}>
                        <h4>MatInput</h4>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput onValidation={(evt) => console.log('onValidation', evt)} name="formIgnore"
                                  label={'Test me I am a text'} formIgnore={true} minLength={8}
                                  validators={[required]} helperText={"sdfsdfsd"}
                                  validationErrorMessages={{
                                      'required': 'hey please set me',
                                      'min-length': 'the minimum length is 8'
                                  }}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="placeholder" label={'Placeholder here'} placeholder={'Placeholder here'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="number" type={'number'} label={'Test me I am a number'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withValue" label={'With value'} value={'With value'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withoutLabel" value={'Without label'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name={'withValueAndDisabled'} label={'With value and disabled'}
                                  value={'With value and disabled'}
                                  disabled={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withValueAndDisabledAndHelperText" label={'With value, disabled and helperText'}
                                  value={'With value, disabled and helperText'}
                                  disabled={true} helperText={'With value, disabled and helperText'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="passwort" label={'With value as password'} value={'With value as password'}
                                  type="password"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="Iam hidden" label={'I am hidden'} value={'You can not see this value'}
                                  hidden={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="readonly" label={'I am readonly'} value={'I am readonly'}
                                  readonly={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="maxlength14" label={'Max length 14'} value={'Max length 14'}
                                  maxLength={13}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="numberRange" label={'Range between 5-10'} type="number" min={5} max={10}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="dateRange" label={'Range between dates'} type="date"
                                  min={new Date(1583451888178)}
                                  max={new Date(1585871088178)}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="ownIcon" label={'Own svg icon'} value={"Own svg icon"}>
                            <MatIcon src={resolveRequire(require('../../static/icon/springtype-logo.svg'))} class={['prefix']}/>
                        </MatInput>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="materialIcon" label={'Material Icons'} value={"Material Icons"}>
                            <i class="material-icons prefix">mode_edit</i>
                        </MatInput>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withCounter" label={'Character counter'} characterCounter={true}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withCounterAndValue" label={'Character counter with value '}
                                  characterCounter={true} value={'1234'}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput name="withCounterAndMaxvalue" label={'Character counter with value and maxlength'}
                                  characterCounter={true}
                                  value={'yeah!!!'} maxLength={120}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput ref={{inputTextRef: this}} name="withRequiredValidator" validators={[required]}
                                  label={'Address'}
                                  characterCounter={true}
                                  validationErrorMessages={{'required': 'you forgot me'}}
                                  helperText={'required *'}
                                  value={'Schnaupping 16'} maxLength={20}/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput ref={{inputDateRef: this}} name="dateRange" label={'Range between dates'}
                                  type="date"/>
                    </div>
                    <div class={['col', 's12']}>
                        <MatInput ref={{passwordInputRef: this}} name="password" label="Password" type="password"
                                  helperText="Enter here your password"
                                  validators={[required, lowercase, uppercase, number, special, minLength(10)]}
                                  onValidation={() => {
                                      if (this.passwordRepeatInputRef.inputRef.value !== '') {
                                          this.passwordRepeatInputRef.validate(true);
                                      }
                                  }}
                                  validationErrorMessages={{
                                      [REQUIRED]: 'This field is required',
                                      [LOWERCASE]: 'Missing lowercase characters',
                                      [UPPERCASE]: 'Missing uppercase characters',
                                      [NUMBER]: 'Missing numbers',
                                      [SPECIAL]: 'Missing special character -!$%^&*()_|~`{}\\[\\]:\\/;<>?,.@#\'"',
                                      [MIN_LENGTH]: 'The required minimum length is ' + 10,
                                  }}>
                        </MatInput>
                    </div>
                    <div class={['col', 's12']}>

                        <MatInput ref={{passwordRepeatInputRef: this}} name="passwordRepeat" label="Repeat password"
                                  type="password"
                                  helperText="Enter here your password"
                                  validators={[required, validatorNameFactory((value: string) => {
                                      return this.passwordInputRef.getValue() === value;
                                  }, 'same')]}
                                  validationErrorMessages={{
                                      [REQUIRED]: 'This field is required',
                                      same: 'Password are not equal'
                                  }}>
                        </MatInput>
                    </div>
                    <div class={['col', 's12']}>
                        <Container tag={"center"}>
                            <button class="btn" onClick={() => this.submitForm()}>Validate</button>
                        </Container>
                    </div>
                </div>
            </Form>
        </div>
    }

    async submitForm() {
        const formValidationResult = await this.formRef.validate();
        console.log('formValidationResult', formValidationResult, this.formRef.getState());
        this.inputTextRef.setValue("Yeah i am an input");
        this.inputDateRef.setValueAsDate(new Date());
    }
}
