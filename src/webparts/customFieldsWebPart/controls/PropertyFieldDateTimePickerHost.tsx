/**
 * @file PropertyFieldDateTimePickerHost.tsx
 * Renders the controls for PropertyFieldDateTimePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import { IPropertyFieldDateTimePickerPropsInternal } from './PropertyFieldDateTimePicker';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import * as strings from 'customFieldsWebPartStrings';

/**
 * @interface
 * PropertyFieldDateTimePickerHost properties interface
 *
 */
export interface IPropertyFieldDateTimePickerHostProps extends IPropertyFieldDateTimePickerPropsInternal {
}

/**
 * @class
 * Defines the labels of the DatePicker control (as months, days, etc.)
 *
 */
class DatePickerStrings implements IDatePickerStrings {
    /**
     * An array of strings for the full names of months.
     * The array is 0-based, so months[0] should be the full name of January.
     */
    public months: string[] = [
      strings.DatePickerMonthLongJanuary, strings.DatePickerMonthLongFebruary,
      strings.DatePickerMonthLongMarch, strings.DatePickerMonthLongApril,
      strings.DatePickerMonthLongMay, strings.DatePickerMonthLongJune, strings.DatePickerMonthLongJuly,
      strings.DatePickerMonthLongAugust, strings.DatePickerMonthLongSeptember, strings.DatePickerMonthLongOctober,
      strings.DatePickerMonthLongNovember, strings.DatePickerMonthLongDecember
    ];
    /**
     * An array of strings for the short names of months.
     * The array is 0-based, so shortMonths[0] should be the short name of January.
     */
    public shortMonths: string[] = [
      strings.DatePickerMonthShortJanuary, strings.DatePickerMonthShortFebruary,
      strings.DatePickerMonthShortMarch, strings.DatePickerMonthShortApril,
      strings.DatePickerMonthShortMay, strings.DatePickerMonthShortJune, strings.DatePickerMonthShortJuly,
      strings.DatePickerMonthShortAugust, strings.DatePickerMonthShortSeptember, strings.DatePickerMonthShortOctober,
      strings.DatePickerMonthShortNovember, strings.DatePickerMonthShortDecember
    ];
    /**
     * An array of strings for the full names of days of the week.
     * The array is 0-based, so days[0] should be the full name of Sunday.
     */
    public days: string[] = [
      strings.DatePickerDayLongSunday, strings.DatePickerDayLongMonday, strings.DatePickerDayLongTuesday,
      strings.DatePickerDayLongWednesday, strings.DatePickerDayLongThursday, strings.DatePickerDayLongFriday,
      strings.DatePickerDayLongSaturday
    ];
    /**
     * An array of strings for the initials of the days of the week.
     * The array is 0-based, so days[0] should be the initial of Sunday.
     */
    public shortDays: string[] = [
      strings.DatePickerDayShortSunday, strings.DatePickerDayShortMonday, strings.DatePickerDayShortTuesday,
      strings.DatePickerDayShortWednesday, strings.DatePickerDayShortThursday, strings.DatePickerDayShortFriday,
      strings.DatePickerDayShortSaturday
    ];
    /**
     * String to render for button to direct the user to today's date.
     */
    public goToToday: string = "";
    /**
     * Error message to render for TextField if isRequired validation fails.
     */
    public isRequiredErrorMessage: string = "";
    /**
     * Error message to render for TextField if input date string parsing fails.
     */
    public invalidInputErrorMessage: string = "";
}

/**
 * @class
 * Renders the controls for PropertyFieldDateTimePicker component
 */
export default class PropertyFieldDateTimePickerHost extends React.Component<IPropertyFieldDateTimePickerHostProps, {}> {

  /**
   * @function
   * Contructor
   */
  constructor(props: IPropertyFieldDateTimePickerHostProps) {
    super(props);
    //Bind the current object to the external called onSelectDate method
    this.onSelectDate = this.onSelectDate.bind(this);
  }

  /**
   * @function
   * Function called when the DatePicker Office UI Fabric component selected date changed
   */
  private onSelectDate(date: Date): void {
    //Checks if there is a method to called
    if (this.props.onPropertyChange && date != null) {
      //Checks if a formatDate function has been defined
      if (this.props.formatDate)
        this.props.onPropertyChange(this.props.targetProperty, this.props.formatDate(date));
      else
        this.props.onPropertyChange(this.props.targetProperty, date.toDateString());
    }
  }

  private formatDateIso(date: Date): string {
    //example for ISO date formatting
    return date.toISOString().substr(0, 10);
  }

  /**
   * @function
   * Renders the datepicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    //Defines the DatePicker control labels
    var dateStrings: DatePickerStrings = new DatePickerStrings();
    //Constructs a Date type object from the initalDate string property
    var date: Date;
    if (this.props.initialDate != null && this.props.initialDate != '')
      date = new Date(this.props.initialDate);
    //Renders content
    return (
      <div>
        <Label>{this.props.label}</Label>
        <div style={{width:'255px'}}>
            <DatePicker value={date} strings={dateStrings}
              isMonthPickerVisible={false} onSelectDate={this.onSelectDate} allowTextInput={false}
              formatDate={this.formatDateIso}
              />
        </div>
        <div style={{display: 'inline-flex', marginBottom: '8px'}}>
          <div style={{width:'100px'}}>
            <Dropdown
              label=""
              options={[
                { text: '00', key: '00'},
                { text: '01', key: '01'}
              ]}
              />
          </div>
          <div style={{paddingTop: '16px', paddingLeft: '2px', paddingRight: '2px'}}>:</div>
          <div style={{width:'70px'}}>
              <Dropdown
              label=""
              options={[
                { text: '00', key: '00'},
                { text: '01', key: '01'}
              ]}
              />
          </div>
          <div style={{paddingTop: '16px', paddingLeft: '2px', paddingRight: '2px'}}>:</div>
          <div style={{width:'70px'}}>
              <Dropdown
              label=""
              options={[
                { text: '00', key: '00'},
                { text: '01', key: '01'}
              ]}
              />
          </div>
        </div>
      </div>
    );
  }
}