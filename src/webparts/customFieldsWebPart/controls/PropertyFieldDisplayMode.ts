/**
 * @file PropertyFieldDisplayMode.ts
 * Define a custom field of type PropertyFieldDisplayMode for
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
import PropertyFieldDisplayModeHost, { IPropertyFieldDisplayModeHostProps } from './PropertyFieldDisplayModeHost';

/**
 * @interface
 * Public properties of the PropertyFieldDisplayMode custom field
 *
 */
export interface IPropertyFieldDisplayModeProps {
  /**
   * @var
   * Property field label displayed on top
   */
  label: string;
  /**
   * @var
   * Initial value
   */
  initialValue?: string;
  /**
   * @function
   * Defines a onPropertyChange function to raise when the selected Color changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Private properties of the PropertyFieldDisplayMode custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldDisplayMode.
 *
 */
export interface IPropertyFieldDisplayModePropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: string;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Represents a PropertyFieldDisplayMode object
 *
 */
class PropertyFieldDisplayModeBuilder implements IPropertyPaneField<IPropertyFieldDisplayModePropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldDisplayModePropsInternal;

  //Custom properties
  private label: string;
  private initialValue: string;
  private onPropertyChange: (propertyPath: string, newValue: any) => void;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldDisplayModePropsInternal) {
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.label = _properties.label;
    this.initialValue = _properties.initialValue;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
  }

  /**
   * @function
   * Renders the ColorPicker field content
   */
  private render(elem: HTMLElement): void {
    //Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldDisplayModeHostProps> = React.createElement(PropertyFieldDisplayModeHost, {
      label: this.label,
      initialValue: this.initialValue,
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
 * Helper method to create a Color Picker on the PropertyPane.
 * @param targetProperty - Target property the Color picker is associated to.
 * @param properties - Strongly typed Color Picker properties.
 */
export function PropertyFieldDisplayMode(targetProperty: string, properties: IPropertyFieldDisplayModeProps): IPropertyPaneField<IPropertyFieldDisplayModePropsInternal> {

    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldDisplayModePropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
      initialValue: properties.initialValue,
      onPropertyChange: properties.onPropertyChange,
      onDispose: null,
      onRender: null
    };
    //Calles the PropertyFieldDisplayMode builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldDisplayModeBuilder(targetProperty, newProperties);
}


