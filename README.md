# SPFx custom fields samples

> Note: The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production enviornments.

These samples show how to implement custom fields with the new SharePoint Framework (SPFx). These samples
include an implementation of **PropertyFieldDatePicker**, **PropertyFieldPeoplePicker** and **PropertyFieldSPListPicker** controls, based on the Office UI Fabric framework and React. You can use these custom fields to your own client side web parts. You can find bellow the complete list of all these custom fields and you can click on the custom field name to consult the complete documentation.


Custom Field | Description |  Overview
------------ | ----------- | -----------
[PropertyFieldDatePicker](/OlivierCC/spfx-custom-fields/wiki/PropertyFieldDatePicker) | Custom field to select a Date with a mini-calendar based on the Office UI Fabric DatePicker control | ![PropertyFieldDatePicker](./assets/OverviewDatePicker.png)
[PropertyFieldPeoplePicker](/OlivierCC/spfx-custom-fields/wiki/PropertyFieldPeoplePicker) | Custom field to select users from the SharePoint users database with a search field. Start to enter a lastname or a firstname, and pick a user  | ![PropertyFieldPeoplePicker](./assets/OverviewPeoplePicker.png)
[PropertyFieldSPListPicker](/OlivierCC/spfx-custom-fields/wiki/PropertyFieldSPListPicker)| Custom field to select a list from the current SharePoint web site.   | ![PropertyFieldSPListPicker](./assets/OverviewSPListPicker.png)
PropertyFieldSPListMultiplePicker | Under development


# Build and run this sample in the SharePoint workbench

```bash
git clone the repo
npm i
tsd install
gulp serve
```

If you need more information about to develop SharePoint Framework client side web part, deploy and test it on your workbench
station, you can consult the following tutorial: https://github.com/SharePoint/sp-dev-docs/wiki/Setup-SharePoint-Tenant

# The MIT License (MIT)

Copyright (c) 2016 Olivier Carpentier

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
