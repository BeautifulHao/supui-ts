import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import { Upload, UploadProps, UploadFile } from './upload';

export default {
  title: 'Example/Upload',
  component: Upload
} as Meta;

// const defaultFileList: UploadFile[] = [
//   { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
//   { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
//   { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
// ]

const Template: Story<UploadProps> = (args: UploadProps) => (<Upload {...args} />);

export const defaultUpload = Template.bind({});

defaultUpload.args = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange: (e: File) => action('changed'),
  onRemove: (e: UploadFile) => action('removed'),
  name: "fileName"
};
