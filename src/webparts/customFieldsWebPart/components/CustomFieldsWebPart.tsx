import * as React from 'react';
import { css } from 'office-ui-fabric-react';

import styles from '../CustomFieldsWebPart.module.scss';
import { ICustomFieldsWebPartWebPartProps } from '../ICustomFieldsWebPartWebPartProps';
import { IPropertyFieldPeople } from '../controls/PropertyFieldPeoplePicker';

export interface ICustomFieldsWebPartProps extends ICustomFieldsWebPartWebPartProps {
}

export default class CustomFieldsWebPart extends React.Component<ICustomFieldsWebPartProps, {}> {
  public render(): JSX.Element {

    var peopleList: IPropertyFieldPeople[] = [];
    if (this.props && this.props.people)
      peopleList = this.props.people;
    var lists: string[] = [];
    if (this.props && this.props.listsCollection)
      lists = this.props.listsCollection;

    return (
      <div className={styles.customFieldsWebPart}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Custom WebPart properties sample
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Edit this WebPart to test the custom fields.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                Color: {this.props.color}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
