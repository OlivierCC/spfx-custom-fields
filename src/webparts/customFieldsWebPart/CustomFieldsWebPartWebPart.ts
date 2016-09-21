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
  IWebPartContext
} from '@microsoft/sp-client-preview';
import * as strings from 'customFieldsWebPartStrings';
import CustomFieldsWebPart, { ICustomFieldsWebPartProps } from './components/CustomFieldsWebPart';
import { ICustomFieldsWebPartWebPartProps } from './ICustomFieldsWebPartWebPartProps';

//Include the PropertyFieldDatePicker component
import { PropertyFieldDatePicker } from './controls/PropertyFieldDatePicker';
//Include the PropertyFieldDateTimePicker component
import { PropertyFieldDateTimePicker } from './controls/PropertyFieldDateTimePicker';
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
//Include the PropertyFieldFontSizePicker component
import { PropertyFieldFontSizePicker } from './controls/PropertyFieldFontSizePicker';
//Include the PropertyFieldPhoneNumber component
import { PropertyFieldPhoneNumber, IPhoneNumberFormat } from './controls/PropertyFieldPhoneNumber';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMaskedInput } from './controls/PropertyFieldMaskedInput';
//Include the PropertyFieldMaskedInput component
import { PropertyFieldMapPicker } from './controls/PropertyFieldMapPicker';
//Include the PropertyFieldPicturePicker component
import { PropertyFieldPicturePicker } from './controls/PropertyFieldPicturePicker';
//Include the PropertyFieldIconPicker component
import { PropertyFieldIconPicker } from './controls/PropertyFieldIconPicker';
//Include the PropertyFieldDocumentPicker component
import { PropertyFieldDocumentPicker } from './controls/PropertyFieldDocumentPicker';
//Include the PropertyFieldDisplayMode component
import { PropertyFieldDisplayMode } from './controls/PropertyFieldDisplayMode';
//Include the PropertyFieldCustomList component
import { PropertyFieldCustomList, CustomListFieldType } from './controls/PropertyFieldCustomList';


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
      datetime: this.properties.datetime,
      folder: this.properties.folder,
      people: this.properties.people,
      list: this.properties.list,
      listsCollection: this.properties.listsCollection,
      password: this.properties.password,
      font: this.properties.font,
      fontSize: this.properties.fontSize,
      phone: this.properties.phone,
      maskedInput: this.properties.maskedInput,
      geolocation: this.properties.geolocation,
      picture: this.properties.picture,
      icon: this.properties.icon,
      document: this.properties.document,
      displayMode: this.properties.displayMode,
      customList: this.properties.customList
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
                PropertyFieldDisplayMode('displayMode', {
                  label: strings.DisplayModeFieldLabel,
                  initialValue: this.properties.displayMode,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldFontPicker('font', {
                  label: strings.FontFieldLabel,
                  useSafeFont: true,
                  previewFonts: true,
                  initialValue: this.properties.font,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldFontSizePicker('fontSize', {
                  label: strings.FontSizeFieldLabel,
                  usePixels: false,
                  preview: true,
                  initialValue: this.properties.font,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldFontSizePicker('fontSize', {
                  label: strings.FontSizeFieldLabel,
                  usePixels: true,
                  preview: true,
                  initialValue: this.properties.font,
                  onPropertyChange: this.onPropertyChange
                }),
                PropertyFieldIconPicker('icon', {
                  label: strings.IconFieldLabel,
                  initialValue: this.properties.icon,
                  orderAlphabetical: true,
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
                PropertyFieldCustomList('customList', {
                  label: strings.CustomListFieldLabel,
                  value: this.properties.customList,
                  headerText: "Select List Items",
                  fields: [
                    { title: 'Title', required: true, type: CustomListFieldType.string },
                    { title: 'Description', required: false, type: CustomListFieldType.string },
                    { title: 'Quantity', required: true, type: CustomListFieldType.number },
                    { title: 'Required', required: false, type: CustomListFieldType.boolean },,
                    { title: 'Date', required: false, type: CustomListFieldType.date, hidden: true },
                    { title: 'Date Time', required: false, type: CustomListFieldType.dateTime, hidden: true },
                    { title: 'Font', required: false, type: CustomListFieldType.font, hidden: true },
                    { title: 'Font Size', required: false, type: CustomListFieldType.fontSize, hidden: true },
                    { title: 'Icon', required: false, type: CustomListFieldType.icon, hidden: true },
                    { title: 'Password', required: false, type: CustomListFieldType.password, hidden: true },
                    { title: 'Users', required: false, type: CustomListFieldType.users, hidden: true },
                    { title: 'List', required: false, type: CustomListFieldType.list, hidden: true },
                    { title: 'Color', required: false, type: CustomListFieldType.color, hidden: true }
                  ],
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                }),
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
                PropertyFieldDateTimePicker('datetime', {
                  label: strings.DateTimeFieldLabel,
                  initialDate: this.properties.datetime,
                  //formatDate: this.formatDateIso,
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
                })
            ],
            },
            {
              groupName: 'SharePoint Fields',
              groupFields: [
                PropertyFieldPicturePicker('picture', {
                  label: strings.PictureFieldLabel,
                  initialValue: this.properties.picture,
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                }),
                PropertyFieldDocumentPicker('document', {
                  label: strings.DocumentFieldLabel,
                  initialValue: this.properties.document,
                  onPropertyChange: this.onPropertyChange,
                  context: this.context
                }),
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
