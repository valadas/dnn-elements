import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { actions } from '@storybook/addon-actions';
import readme from "./readme.md";

const meta: Meta = {
    title: 'Elements/Image Cropper',
    component: 'dnn-image-cropper',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
              component: readme,
            }
        }
    },
    argTypes: {
        width: {
            control: 'number',
        },
        height: {
            control: 'number',
        },
        allowedExtensions: {
            control: 'text',
        },
        quality: {
            options: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
            control: 'number',
        },
        preventUndersized: {
            control: 'boolean',
          },
        },
} 

export default meta;

const eventsFromNames = actions('imageCropChanged', );

const resx:{
    capture: string;
    dragAndDropFile: string;
    or: string;
    takePicture: string;
    uploadFile: string;
    imageTooSmall: string;
    modalCloseText: string;
} = {
    capture: "Capture",
    dragAndDropFile: "Drag and drop an image",
    or: "or",
    takePicture: "Take a picture",
    uploadFile: "Upload an image",
    imageTooSmall: "The image you are attempting to upload does not meet the minimum size requirement of {width} pixels by {height} pixels. Please upload a larger image.",
    modalCloseText: "Close",
}

const Template = (args) =>
    html`
        <dnn-image-cropper
            .resx=${args.resx}
            width=${ifDefined(args.width)}
            height=${ifDefined(args.height)}
            allowed-extensions=${ifDefined(args.allowedExtensions)}
            quality=${ifDefined(args.captureQuality)}
            ?prevent-undersized=${ifDefined(args.preventUndersized)}>
        </dnn-image-cropper>
    `;

type Story = StoryObj;

export const ImageCropper: Story = Template.bind({});
ImageCropper.args = {
    width: 600,
    height: 600,
    allowedExtensions: 'jpg,jpeg,png,gif',
    quality: 0.8,
    preventUndersized: false,
    resx,
};