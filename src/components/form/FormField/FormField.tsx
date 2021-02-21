import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';
import { useField } from 'formik';

import Input, { InputProps } from 'components/form/Input/Input';
import Checkbox, { CheckboxProps } from 'components/form/Checkbox/Checkbox';
import { phoneFormat } from 'utils/format';

import { StyledLabel } from 'styles/shared';

interface Props {
  type: React.HTMLProps<HTMLInputElement>['type'] | 'phone' | 'date' | 'checkbox' | 'textarea' | 'zipCode';
  name: string;
  label?: string;
  spacing?: boolean;
  onFieldChange?: () => void;
  onFieldError?: () => void;
}

type FieldProps = InputProps | CheckboxProps;
type FormFieldProps = React.HTMLProps<HTMLInputElement> & Props & FieldProps;

const FormField: React.FC<FormFieldProps> = ({ type = 'text', name, spacing, label, onFieldChange, onFieldError, ...rest }) => {
  const [field, meta, helpers] = useField({ name });

  const { error, touched } = meta;
  const { setValue } = helpers;

  const showError = error && touched;
  const labelText = label ? (error ? error : label) : '';

  const handleSetValue = (value: any) => {
    setValue(value);
    onFieldChange && onFieldChange();
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSetValue(event.target.value);
  const handleCheckboxChange = () => handleSetValue(!field.value);
  const onDateSelect = (date: Date) => {
    date.setHours(12);
    handleSetValue(date);
  };

  useEffect(() => {
    if (showError) {
      onFieldError && onFieldError();
    }
  }, [showError]);

  if (type === 'date') {
    return (
      <>
        <StyledLabel>{label}</StyledLabel>
        <DatePicker
          {...[rest as any]}
          onChange={onDateSelect}
          selected={field.value}
          onInputError={onFieldError}
          dateFormat={'dd/MM/yyyy'}
        />
      </>
    );
  }

  if (type === 'phone') {
    return (
      <>
        <StyledLabel>{label}</StyledLabel>
        <NumberFormat
          onValueChange={({ formattedValue }) => setValue(formattedValue)}
          name={name}
          value={field.value}
          format={phoneFormat}
          className={'phone-input'}
        />
      </>
    );
  }

  if (type === 'zipCode') {
    return (
      <div>
        <StyledLabel>{label}</StyledLabel>
        <NumberFormat
          onValueChange={({ formattedValue }) => setValue(formattedValue)}
          name={name}
          value={field.value}
          format={'##-###'}
          className={'phone-input'}
        />
      </div>
    );
  }

  if (type === 'checkbox') {
    return <Checkbox label={labelText} field={{ ...field, onChange: handleCheckboxChange }} />;
  }

  if (type === 'textarea') {
    return (
      <>
        <StyledLabel>{label}</StyledLabel>
        <textarea name={name} value={field.value} required={!!rest.required} onChange={onInputChange} {...[rest as any]} />
      </>
    );
  }

  return (
    <Input
      {...rest}
      type={type}
      spacing={spacing}
      field={{ ...field, onChange: onInputChange }}
      labelText={label}
      errorMessage={error}
    />
  );
};

export default FormField;
