'use client'
import PropTypes from 'prop-types'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const FormFieldType = {
    INPUT: 'input',
    PASSWORD: 'password',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    PASSWORD: 'password',
}

// RenderField Component
const RenderField = ({ field, fieldType, placeholder, options }) => {
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <FormControl>
                    <Input placeholder={placeholder} {...field} />
                </FormControl>
            )
        case FormFieldType.PASSWORD:
            return (
                <FormControl>
                    <Input
                        placeholder={placeholder}
                        {...field}
                        type={fieldType}
                    />
                </FormControl>
            )
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options &&
                                options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea placeholder={placeholder} {...field} />
                </FormControl>
            )
        default:
            break
    }
}

export const CustomField = ({
    control,
    fieldType,
    name,
    label,
    placeholder,
    options,
}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <RenderField
                        field={field}
                        fieldType={fieldType}
                        placeholder={placeholder}
                        options={options}
                    />
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

CustomField.propTypes = {
    control: PropTypes.object.isRequired,
    fieldType: PropTypes.oneOf(Object.values(FormFieldType)).isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
}
