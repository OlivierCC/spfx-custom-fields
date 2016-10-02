/**
 * @file PropertyFieldColorPicker.ts
 * Define a custom field of type PropertyFieldColorPicker for
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
import PropertyFieldColorPickerHost, { IPropertyFieldColorPickerHostProps } from './PropertyFieldColorPickerHost';

/**
 * @interface
 * Public properties of the PropertyFieldColorPicker custom field
 *
 */
export interface IPropertyFieldColorPickerProps {
  /**
   * @var
   * Property field label displayed on top
   */
  label: string;
  /**
   * @var
   * Initial color
   */
  initialColor?: string;
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
 * Private properties of the PropertyFieldColorPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldColorPicker.
 *
 */
export interface IPropertyFieldColorPickerPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialColor?: string;
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, newValue: any): void;
}

/**
 * @interface
 * Represents a PropertyFieldColorPicker object
 *
 */
class PropertyFieldColorPickerBuilder implements IPropertyPaneField<IPropertyFieldColorPickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldColorPickerPropsInternal;

  //Custom properties
  private label: string;
  private initialColor: string;
  private onPropertyChange: (propertyPath: string, newValue: any) => void;

  /**
   * @function
   * Ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldColorPickerPropsInternal) {
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.label = _properties.label;
    this.initialColor = _properties.initialColor;
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
    const element: React.ReactElement<IPropertyFieldColorPickerHostProps> = React.createElement(PropertyFieldColorPickerHost, {
      label: this.label,
      initialColor: this.initialColor,
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
export function PropertyFieldColorPicker(targetProperty: string, properties: IPropertyFieldColorPickerProps): IPropertyPaneField<IPropertyFieldColorPickerPropsInternal> {

    //Create an internal properties object from the given properties
    var newProperties: IPropertyFieldColorPickerPropsInternal = {
      label: properties.label,
      targetProperty: targetProperty,
      initialColor: properties.initialColor,
      onPropertyChange: properties.onPropertyChange,
      onDispose: null,
      onRender: null
    };
    //Calles the PropertyFieldColorPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldColorPickerBuilder(targetProperty, newProperties);
}


