/**
 * @file PropertyFieldPeoplePickerHost.tsx
 * Renders the controls for PropertyFieldPeoplePicker component
 *
 * @copyright 2016 Olivier Carpentier
 * Released under MIT licence
 *
 * UNDER DEVELOPPEMENT
 */
import * as React from 'react';
import { IPropertyFieldPeoplePickerPropsInternal } from './PropertyFieldPeoplePicker';
import { PeoplePicker } from 'office-ui-fabric-react/lib/PeoplePicker';

/**
 * @interface
 * PropertyFieldPeoplePickerHost properties interface
 *
 */
export interface IPropertyFieldPeoplePickerHostProps extends IPropertyFieldPeoplePickerPropsInternal {
}

/**
 * @class
 * Renders the controls for PropertyFieldPeoplePicker component
 */
export default class PropertyFieldDatePickerHost extends React.Component<IPropertyFieldPeoplePickerHostProps, {}> {

  /**
   * @function
   * Contructor
   */
  constructor(props: IPropertyFieldPeoplePickerHostProps) {
    super(props);
  }

  /**
   * @function
   * Renders the datepicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    //Defines the DatePicker control labels
    //Renders content
    return (
      <div>
        <PeoplePicker />
      </div>
    );
  }
}