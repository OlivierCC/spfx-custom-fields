import { IPropertyFieldPeople } from './controls/PropertyFieldPeoplePicker';

export interface ICustomFieldsWebPartWebPartProps {
  description: string;
  color: string;
  date: string;
  date2: string;
  datetime: string;
  people: IPropertyFieldPeople[];
  list: string;
  listsCollection: string[];
  folder: string;
  password: string;
  font: string;
  fontSize: string;
  phone: string;
  maskedInput: string;
  geolocation: string;
  picture: string;
  icon: string;
  document: string;
  displayMode: string;
  customList: any[];
}
