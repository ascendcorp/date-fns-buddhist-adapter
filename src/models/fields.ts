import type { TextFieldProps } from '@mui/material/TextField'
import type * as React from 'react'

export interface FieldChangeHandlerContext<TError> {
  validationError: TError
}

export type FieldChangeHandler<TValue, TError> = (
  value: TValue,
  context: FieldChangeHandlerContext<TError>,
) => void

export interface UseFieldInternalProps<
  TValue,
  TDate,
  TSection extends FieldSection,
  TError,
> {
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value?: TValue
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: TValue
  /**
   * The date used to generate a part of the new value that is not present in the format when both `value` and `defaultValue` are empty.
   * For example, on time fields it will be used to determine the date to set.
   * @default The closest valid date using the validation props, except callbacks such as `shouldDisableDate`. Value is rounded to the most granular section used.
   */
  referenceDate?: TDate
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange?: FieldChangeHandler<TValue, TError>
  /**
   * Callback fired when the error associated to the current value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error.
   * @param {TValue} value The value associated to the error.
   */
  onError?: (error: TError, value: TValue) => void
  /**
   * Format of the date when rendered in the input(s).
   */
  format: string
  /**
   * Density of the format when rendered in the input.
   * Setting `formatDensity` to `"spacious"` will add a space before and after each `/`, `-` and `.` character.
   * @default "dense"
   */
  formatDensity?: 'dense' | 'spacious'
  /**
   * If `true`, the format will respect the leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `8/16/2018`)
   * If `false`, the format will always add leading zeroes (e.g: on dayjs, the format `M/D/YYYY` will render `08/16/2018`)
   *
   * Warning n°1: Luxon is not able to respect the leading zeroes when using macro tokens (e.g: "DD"), so `shouldRespectLeadingZeros={true}` might lead to inconsistencies when using `AdapterLuxon`.
   *
   * Warning n°2: When `shouldRespectLeadingZeros={true}`, the field will add an invisible character on the sections containing a single digit to make sure `onChange` is fired.
   * If you need to get the clean value from the input, you can remove this character using `input.value.replace(/\u200e/g, '')`.
   *
   * Warning n°3: When used in strict mode, dayjs and moment require to respect the leading zeros.
   * This mean that when using `shouldRespectLeadingZeros={false}`, if you retrieve the value directly from the input (not listening to `onChange`) and your format contains tokens without leading zeros, the value will not be parsed by your library.
   *
   * @default `false`
   */
  shouldRespectLeadingZeros?: boolean
  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   * @default false
   */
  readOnly?: boolean
  /**
   * The currently selected sections.
   * This prop accept four formats:
   * 1. If a number is provided, the section at this index will be selected.
   * 2. If an object with a `startIndex` and `endIndex` properties are provided, the sections between those two indexes will be selected.
   * 3. If a string of type `FieldSectionType` is provided, the first section with that name will be selected.
   * 4. If `null` is provided, no section will be selected
   * If not provided, the selected sections will be handled internally.
   */
  selectedSections?: FieldSelectedSections
  /**
   * Callback fired when the selected sections change.
   * @param {FieldSelectedSections} newValue The new selected sections.
   */
  onSelectedSectionsChange?: (newValue: FieldSelectedSections) => void
  /**
   * The ref object used to imperatively interact with the field.
   */
  unstableFieldRef?: React.Ref<FieldRef<TSection>>
}

export interface BaseFieldProps<
  TValue,
  TDate,
  TSection extends FieldSection,
  TError,
> extends Omit<
    UseFieldInternalProps<TValue, TDate, TSection, TError>,
    'format'
  > {
  className?: string
  format?: string
  disabled?: boolean
  ref?: React.Ref<HTMLDivElement>
}

export type FieldsTextFieldProps = Omit<
  TextFieldProps,
  | 'autoComplete'
  | 'error'
  | 'maxRows'
  | 'minRows'
  | 'multiline'
  | 'placeholder'
  | 'rows'
  | 'select'
  | 'SelectProps'
  | 'type'
>

export type FieldSectionType =
  | 'year'
  | 'month'
  | 'day'
  | 'weekDay'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'meridiem'

export type FieldSectionContentType = 'digit' | 'digit-with-letter' | 'letter'

export type FieldValueType = 'date' | 'time' | 'date-time'

export interface FieldSection {
  /**
   * Value of the section, as rendered inside the input.
   * For example, in the date `May 25, 1995`, the value of the month section is "May".
   */
  value: string
  /**
   * Format token used to parse the value of this section from the date object.
   * For example, in the format `MMMM D, YYYY`, the format of the month section is "MMMM".
   */
  format: string
  /**
   * Maximum length of the value, only defined for "digit" sections.
   * Will be used to determine how many leading zeros should be added to the value.
   */
  maxLength: number | null
  /**
   * Placeholder rendered when the value of this section is empty.
   */
  placeholder: string
  /**
   * Type of the section.
   */
  type: FieldSectionType
  /**
   * Type of content of the section.
   * Will determine if we should apply a digit-based editing or a letter-based editing.
   */
  contentType: FieldSectionContentType
  /**
   * If `true`, the value of this section is supposed to have leading zeroes when parsed by the date library.
   * For example, the value `1` should be rendered as "01" instead of "1".
   * @deprecated Will be removed in v7, use `hasLeadingZerosInFormat` instead.
   */
  hasLeadingZeros: boolean
  /**
   * If `true`, the value of this section is supposed to have leading zeroes when parsed by the date library.
   * For example, the value `1` should be rendered as "01" instead of "1".
   */
  hasLeadingZerosInFormat: boolean
  /**
   * If `true`, the value of this section is supposed to have leading zeroes when rendered in the input.
   * For example, the value `1` should be rendered as "01" instead of "1".
   */
  hasLeadingZerosInInput: boolean
  /**
   * If `true`, the section value has been modified since the last time the sections were generated from a valid date.
   * When we can generate a valid date from the section, we don't directly pass it to `onChange`,
   * Otherwise, we would lose all the information contained in the original date, things like:
   * - time if the format does not contain it
   * - timezone / UTC
   *
   * To avoid losing that information, we transfer the values of the modified sections from the newly generated date to the original date.
   */
  modified: boolean
  /**
   * Start index of the section in the format
   */
  start: number
  /**
   * End index of the section in the format
   */
  end: number
  /**
   * Start index of the section value in the input.
   * Takes into account invisible unicode characters such as \u2069 but does not include them
   */
  startInInput: number
  /**
   * End index of the section value in the input.
   * Takes into account invisible unicode characters such as \u2069 but does not include them
   */
  endInInput: number
  /**
   * Separator displayed before the value of the section in the input.
   * If it contains escaped characters, then it must not have the escaping characters.
   * For example, on Day.js, the `year` section of the format `YYYY [year]` has an end separator equal to `year` not `[year]`
   */
  startSeparator: string
  /**
   * Separator displayed after the value of the section in the input.
   * If it contains escaped characters, then it must not have the escaping characters.
   * For example, on Day.js, the `year` section of the format `[year] YYYY` has a start separator equal to `[year]`
   */
  endSeparator: string
}

export interface FieldRef<TSection extends FieldSection> {
  /**
   * Returns the sections of the current value.
   * @returns {TSection[]} The sections of the current value.
   */
  getSections: () => TSection[]
  /**
   * Returns the index of the active section (the first focused section).
   * If no section is active, returns `null`.
   * @returns {number | null} The index of the active section.
   */
  getActiveSectionIndex: () => number | null
  /**
   * Updates the selected sections.
   * @param {FieldSelectedSections} selectedSections The sections to select.
   */
  setSelectedSections: (selectedSections: FieldSelectedSections) => void
}

export type FieldSelectedSections =
  | number
  | FieldSectionType
  | null
  | 'all'
  | { startIndex: number; endIndex: number }

/**
 * Props the single input field can receive when used inside a picker.
 * Only contains what the MUI component are passing to the field, not what users can pass using the `props.slotProps.field`.
 */
export interface BaseSingleInputFieldProps<
  TValue,
  TDate,
  TSection extends FieldSection,
  TError,
> extends BaseFieldProps<TValue, TDate, TSection, TError> {
  label?: React.ReactNode
  id?: string
  inputRef?: React.Ref<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler
  onBlur?: React.FocusEventHandler
  focused?: boolean
  InputProps?: {
    ref?: React.Ref<any>
    endAdornment?: React.ReactNode
    startAdornment?: React.ReactNode
  }
  inputProps?: {
    'aria-label'?: string
  }
  slots?: Record<string, never>
  slotProps?: Record<string, never>
}
