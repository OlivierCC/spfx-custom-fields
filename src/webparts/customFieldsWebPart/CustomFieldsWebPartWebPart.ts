/**
 * @file CustomFieldsWebPartWebPart.ts
 * Custom field implementation sample for the SharePoint Framework (SPfx)
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import * as strings from 'customFieldsWebPartStrings';
import CustomFieldsWebPart, { ICustomFieldsWebPartProps } from './components/CustomFieldsWebPart';
import { ICustomFieldsWebPartWebPartProps } from './ICustomFieldsWebPartWebPartProps';

//Include the PropertyFieldDatePicker component
import { PropertyFieldDatePicker } from './controls/PropertyFieldDatePicker';
//Include the PropertyFieldColorPicker component
import { PropertyFieldColorPicker } from './controls/PropertyFieldColorPicker';
//Include the PropertyFieldPeoplePicker component
import { PropertyFieldPeoplePicker } from './controls/PropertyFieldPeoplePicker';
//Include the PropertyFieldSPListPicker component
import { PropertyFieldSPListPicker, PropertyFieldSPListPickerOrderBy } from './controls/PropertyFieldSPListPicker';
//Include the PropertyFieldSPListMultiplePicker component
import { PropertyFieldSPListMultiplePicker, PropertyFieldSPListMultiplePickerOrderBy } from './controls/PropertyFieldSPListMultiplePicker';
//Include the PropertyFieldSPFolderPicker component
import { PropertyFieldSPFolderPicker } from './controls/PropertyFieldSPFolderPicker';
//Include the PropertyFieldPassword component
import { PropertyFieldPassword } from './controls/PropertyFieldPassword';
//Include the PropertyFieldFontPicker component
import { PropertyFieldFontPicker } from './controls/PropertyFieldFontPicker';
//Include the PropertyFieldPhoneNumber component
import { PropertyFieldPhoneNumber, IPhoneNumberFormat } from './controls/PropertyFieldPhoneNumber';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMaskedInput } from './controls/PropertyFieldMaskedInput';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMapPicker } from './controls/PropertyFieldMapPicker';

export default class CustomFieldsWebPartWebPart extends BaseClientSideWebPart<ICustomFieldsWebPartWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  public render(): void {
    const element: React.ReactElement<ICustomFieldsWebPartProps> = React.createElement(CustomFieldsWebPart, {
      description: this.properties.description,
      color: this.properties.color,
      date: this.properties.date,
      date2: this.properties.date2,
      folder: this.properties.folder,
      people: this.properties.people,
      list: this.properties.list,
      listsCollection: this.properties.listsCollection,
      password: this.properties.password,
      font: this.properties.font,
      phone: this.properties.phone,
      maskedInput: this.properties.maskedInput,
      geolocation: this.properties.geolocation
    });

    ReactDom.render(element, this.domElement);
  }

	protected get disableReactivePropertyChanges(): boolean {
		return false;
	}

  private formatDateIso(date: Date): string {
    //example for ISO date formatting
    return date.toISOString();
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          //Display the web part properties as accordion
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: 'Layout Fields',
              groupFields: [
                PropertyFieldFontPicker('font', {
                  label: strings.FontFieldLabel,
                  useSafeFont: true,
                  previewFonts: true,
                  initialValue: this.properties.font,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldColorPicker('color', {
                  label: strings.ColorFieldLabel,
                  initialColor: this.properties.color,
                  onPropertyChange: this.onPropertyChange
                })
              ],
            },
            {
              groupName: 'Text Input Fields',
              groupFields: [
                PropertyFieldPassword('password', {
                  label: strings.PasswordFieldLabel,
                  initialValue: this.properties.password,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldDatePicker('date', {
                  label: strings.DateFieldLabel,
                  initialDate: this.properties.date,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldDatePicker('date2', {
                  label: strings.DateFieldLabel,
                  initialDate: this.properties.date2,
                  formatDate: this.formatDateIso,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldPhoneNumber('phone', {
                  label: strings.PhoneNumberFieldLabel,
                  initialValue: this.properties.phone,
                  phoneNumberFormat: IPhoneNumberFormat.UnitedStates,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldMaskedInput('maskedInput', {
                  label: strings.MaskedInputFieldLabel,
                  initialValue: this.properties.maskedInput,
                  pattern: '\d{4} \d{4} \d{4} \d{4}',
                  placeholder: 'XXXX XXXX XXXX XXXX',
                  maxLength: '19',
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldMapPicker('geolocation', {
                  label: strings.GeoLocationFieldLabel,
                  longitude: this.properties.geolocation != null ? this.properties.geolocation.substr(0, this.properties.geolocation.indexOf(",")) : '0',
                  latitude: this.properties.geolocation != null ? this.properties.geolocation.substr(this.properties.geolocation.indexOf(",") + 1, this.properties.geolocation.length - this.properties.geolocation.indexOf(",")) : '0',
                  onPropertyChange: this.onPropertyChange
                }),

            ],
            },
            {
              groupName: 'SharePoint Fields',
              groupFields: [

                PropertyFieldPeoplePicker('people', {
                  label: strings.PeopleFieldLabel,
                  initialData: this.properties.people,
                  allowDuplicate: true,
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                }),
                PropertyFieldSPListPicker('list', {
                  label: strings.SPListFieldLabel,
                  selectedList: this.properties.list,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldSPListPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                }),
                PropertyFieldSPFolderPicker('folder', {
                  label: strings.SPFolderFieldLabel,
                  initialFolder: this.properties.folder,
                  //baseFolder: '/sites/devcenter/_catalogs',
                  context: this.context,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldSPListMultiplePicker('listsCollection', {
                  label: strings.SPListFieldLabel,
                  selectedLists: this.properties.listsCollection,
                  includeHidden: false,
                  baseTemplate: 109,
                  orderBy: PropertyFieldSPListMultiplePickerOrderBy.Title,
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
