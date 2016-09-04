/**
 * @file PropertyFieldPeoplePicker.ts
 * Define a custom field of type PropertyFieldPeoplePicker for
 * the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 * UNDER DEVELOPPEMENT
 *
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  IPropertyPaneFieldType,
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-client-preview';
import PropertyFieldPeoplePickerHost, { IPropertyFieldPeoplePickerHostProps } from './PropertyFieldPeoplePickerHost';

/**
 * @interface
 * Public properties of the PropertyFieldPeoplePicker custom field
 *
 */
export interface IPropertyFieldPeoplePickerProps {
  label: string;
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
 * Private properties of the PropertyFieldPeoplePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldPeoplePicker.
 *
 */
export interface IPropertyFieldPeoplePickerPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Represents a PropertyFieldPeoplePicker object
 *
 */
class PropertyFieldPeoplePickerBuilder implements IPropertyPaneField<IPropertyFieldPeoplePickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldPeoplePickerPropsInternal;

  //Custom properties
  private label: string;
  private onPropertyChange: (propertyPath: string, newValue: any) => void;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldPeoplePickerPropsInternal) {
    this.label = _properties.label;
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
  }

  /**
   * @function
   * Renders the DatePicker field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldPeoplePickerHostProps> = React.createElement(PropertyFieldPeoplePickerHost, {
      label: this.label,
      targetProperty: this.targetProperty,
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
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
export function PropertyFieldPeoplePicker(targetProperty: string, properties: IPropertyFieldPeoplePickerProps): IPropertyPaneField<IPropertyFieldPeoplePickerPropsInternal> {

    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldPeoplePickerPropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
      onPropertyChange: properties.onPropertyChange,
      onDispose: null,
      onRender: null
    };
    //Calles the PropertyFieldDatePicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldPeoplePickerBuilder(targetProperty, newProperties);
}


