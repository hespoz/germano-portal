// @flow
/* eslint-disable no-unused-vars */

import React from 'react';
import {
    Form,
    Input as InputComponent,
    Radio as RadioComponent,
    Checkbox as CheckboxComponent,
    Select as SelectComponent,
    TextArea as TextAreaComponent,
    Dropdown as DropdownComponent,
    Label
} from 'semantic-ui-react';

/*type InputProps = {
    checked?: boolean,
    name: string,
    onBlur: { (eventOrValue: Event | any): void },
onChange: { (eventOrValue: Event | any): void },
onDrop: { (event: Event): void },
onDragStart: { (event: Event): void },
onFocus: { (event: Event): void },
value: any
};

type FieldProps = {
    input: InputProps,
    meta: {
        error?: any,
        touched: boolean
    },
    required?: boolean,
    width?: string,
    label?: string,
    inline?: boolean,
    defaultChecked?: boolean
};*/

export const InputField = ({
                               input,
                               label,
                               required,
                               width,
                               inline,
                               meta: { touched, error },
                               ...rest
                           }) => (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
        {label && <label>{label}</label>}
        <InputComponent required={required} {...input} {...rest} />
        {touched && error ? (
            <span className={"field_error"}>{error}</span>
        ) : null}
    </Form.Field>
);

export const Input = ({ input, required, meta: { touched, error }, ...rest }) => (
    <InputComponent required={required} {...input} {...rest} />
);

export const TextAreaField = ({
                                  input,
                                  label,
                                  required,
                                  width,
                                  inline,
                                  meta: { touched, error },
                                  ...rest
                              }) => (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
        {label && <label>{label}</label>}
        <TextAreaComponent required={required} {...input} {...rest} />
        {touched && error ? (
            <Label basic color="red" pointing>
                {error}
            </Label>
        ) : null}
    </Form.Field>
);


export const LabelInputField = ({input, required, width, meta: { touched, error }, ...rest}) => ( //eslint-disable-line
    <Form.Field error={!!(touched && error)} required={required} width={width}>
        <InputComponent required={required} {...input} {...rest} />
        {touched && error ? (
            <Label basic color="red" pointing>
                {error}
            </Label>
        ) : null}
    </Form.Field>
)



export const TextArea = ({ input, required, meta: { touched, error }, ...rest }) => (
    <TextAreaComponent required={required} {...input} {...rest} />
);

/*type OptionsFieldProps = FieldProps & {
    options: {
        text: string,
        value: string
    }[]
};*/

export const SelectField = ({
                                input,
                                label,
                                required,
                                width,
                                inline,
                                options,
                                meta: { touched, error },
                                ...custom
                            }) => (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
        {label && <label>{label}</label>}
        <SelectComponent
            search
            value={input.value}
            required={required}
            options={options}
            onChange={(event, data) => input.onChange(data.value)}
            {...custom}
        />
        {touched && error ? (
            <span className={"field_error"}>{error}</span>
        ) : null}
    </Form.Field>
);

export const Select = ({
                           input,
                           required,
                           options,
                           meta: { touched, error },
                           ...rest
                       }) => (
    <SelectComponent
        search
        value={input.value}
        required={required}
        options={options}
        onChange={(event, data) => input.onChange(data.value)}
        {...rest}
    />
);

export const ToggleField = ({ input, label, defaultChecked, width }) => (
    <Form.Field
        control={RadioComponent}
        toggle
        label={label}
        checked={!!input.value}
        defaultChecked={defaultChecked}
        onClick={(event, data) => input.onChange(data.checked)}
        width={width}
    />
);

export const Toggle = ({ input, label, defaultChecked }) => (
    <RadioComponent
        toggle
        label={label}
        checked={!!input.value}
        defaultChecked={defaultChecked}
        onClick={(event, data) => input.onChange(data.checked)}
    />
);

export const Radio = ({ input, label, meta: { touched, error }, ...custom }) => (
    <RadioComponent
        label={label}
        checked={!!input.value}
        onClick={(event, data) => input.onChange(data.checked)}
        {...custom}
    />
);

export const RadioField = ({ input, label, width, meta: { touched, error }, ...custom }) => (
    <Form.Field
        control={RadioComponent}
        label={label}
        width={width}
        checked={!!input.value}
        onClick={(event, data) => input.onChange(data.checked)}
        {...custom}
    />
);

export const Checkbox = ({ input, label, meta: { touched, error }, ...custom }) => (
    <CheckboxComponent
        label={label}
        checked={!!input.value}
        onClick={(event, data) => input.onChange(data.checked)}
        {...custom}
    />
);

export const CheckboxField = ({
                                  input,
                                  label,
                                  width,
                                  meta: { touched, error },
                                  ...custom
                              }) => (
    <Form.Field
        control={CheckboxComponent}
        label={label}
        width={width}
        checked={!!input.value}
        onClick={(event, data) => input.onChange(data.checked)}
        {...custom}
    />
);

/*type RangeFieldProps = FieldProps & {
    min: number,
    max: number
};*/

export const RangeField = ({
                               input,
                               label,
                               width,
                               inline,
                               min,
                               max,
                               required,
                               meta: { touched, error },
                               ...rest
                           }) => (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
        <label>
            {label} : {input.value}
        </label>
        <input type="range" required={required} min={min} max={max} {...input} {...rest} />
        {touched && error ? (
            <Label basic color="red" pointing>
                {error}
            </Label>
        ) : null}
    </Form.Field>
);

export const Range = ({
                          input,
                          min,
                          max,
                          required,
                          meta: { touched, error },
                          ...rest
                      }) => (
    <input type="range" required={required} min={min} max={max} {...input} {...rest} />
);

export const DropdownField = ({
                                  input,
                                  label,
                                  required,
                                  width,
                                  inline,
                                  options,
                                  meta: { touched, error },
                                  ...custom
                              }) => (
    <Form.Field error={!!(touched && error)} required={required} width={width} inline={inline}>
        {label && <label>{label}</label>}
        <DropdownComponent
            search
            value={input.value}
            required={required}
            options={options}
            onChange={(event, data) => input.onChange(data.value)}
            {...custom}
        />
        {touched && error ? (
            <Label basic color="red" pointing>
                {error}
            </Label>
        ) : null}
    </Form.Field>
);

export const Dropdown = ({
                             input,
                             required,
                             options,
                             meta: { touched, error },
                             ...rest
                         }) => (
    <DropdownComponent
        search
        value={input.value}
        required={required}
        options={options}
        onChange={(event, data) => input.onChange(data.value)}
        {...rest}
    />
);

export const UploadField = ({
                                label,
                                input,
                                required,
                                width,
                                inline,
                                meta: { touched, error },
                                ...rest
                            }) => {
    delete input.value; //Delete value from input
    return (
        <Form.Field error={touched && error} required={required} width={width} inline={inline}>
            {label && <label>{label}</label>}
            <InputComponent
                type="file"
                {...input}
                {...rest}
            />
            {touched && error ? (
                <Label basic color="red" pointing>
                    {error}
                </Label>
            ) : null}
        </Form.Field>
    )
};

export const Upload = ({ input, required, meta: { touched, error }, ...rest }) => {
    delete input.value;
    return(
        <InputComponent
            required={required}
            type="file"
            {...input}
            {...rest}
        />
    )
};

