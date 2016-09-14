import { IPropertyFieldPeople } from './controls/PropertyFieldPeoplePicker';

export interface ICustomFieldsWebPartWebPartProps {
  description: string;
  color: string;
  date: string;
  date2: string;
  people: IPropertyFieldPeople[];
  list: string;
  listsCollection: string[];
  folder: string;
  password: string;
  font: string;
  phone: string;
}
