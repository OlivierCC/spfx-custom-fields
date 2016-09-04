/**
 * @file PropertyFieldDatePicker.ts
 * Define a custom field of type PropertyFieldDatePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  IPropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-client-preview';
import PropertyFieldDatePickerHost, { IPropertyFieldDatePickerHostProps } from './PropertyFieldDatePickerHost';

/**
 * @interface
 * Public properties of the PropertyFieldDatePicker custom field
 *
 */
export interface IPropertyFieldDatePickerProps {
  /**
   * @var
   * Property field label displayed on top
   */
  label: string;
  /**
   * @var
   * Initial date of the control
   */
  initialDate?: string;
  /**
   * @function
   * Defines a formatDate function to display the date of the custom Field.
   * By defaut date.toDateString() is used.
   */
  formatDate?: (date: Date) => string;
  /**
   * @function
   * Defines a onPropertyChange function to raise when the selected date changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Private properties of the PropertyFieldDatePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldDatePicker.
 *
 */
export interface IPropertyFieldDatePickerPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialDate?: string;
  targetProperty: string;
  formatDate?: (date: Date) => string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Represents a PropertyFieldDatePicker object
 *
 */
class PropertyFieldDatePickerBuilder implements IPropertyPaneField<IPropertyFieldDatePickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldDatePickerPropsInternal;

  //Custom properties
  private label: string;
  private initialDate: string;
  private formatDate: (date: Date) => string;
  private onPropertyChange: (propertyPath: string, newValue: any) => void;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldDatePickerPropsInternal) {
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.label = _properties.label;
    this.initialDate = _properties.initialDate;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.formatDate = _properties.formatDate;
  }

  /**
   * @function
   * Renders the DatePicker field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldDatePickerHostProps> = React.createElement(PropertyFieldDatePickerHost, {
      label: this.label,
      initialDate: this.initialDate,
      targetProperty: this.targetProperty,
      formatDate: this.formatDate,
      onDispose: this.dispose,
      onRender: this.render,
      onPropertyChange: this.onPropertyChange
    });
    //Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * @function
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {

  }

}

/**
 * @function
 * Helper method to create a Date Picker on the PropertyPane.
 * @param targetProperty - Target property the date picker is associated to.
 * @param properties - Strongly typed Date Picker properties.
 */
export function PropertyFieldDatePicker(targetProperty: string, properties: IPropertyFieldDatePickerProps): IPropertyPaneField<IPropertyFieldDatePickerPropsInternal> {

    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldDatePickerPropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
      initialDate: properties.initialDate,
      onPropertyChange: properties.onPropertyChange,
      formatDate: properties.formatDate,
      onDispose: null,
      onRender: null
    };
    //Calles the PropertyFieldDatePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDatePickerBuilder(targetProperty, newProperties);
}


