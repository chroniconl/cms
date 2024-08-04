# FileUploader

A file uploader component for React applications. It provides a drag-and-drop area and a button for selecting files. It also supports file type restrictions and file limit restrictions. It is just a lightweight shell really, it doesn't actually display photos, just file names. It's meant to be used in conjunction with additional components to display the actual photos.

### Usage

Here's an example of how to use the `FileUploader` component:

```jsx
import { FileUploader } from '@chroniconl/file-uploader'

function MyComponent() {
  return (
    <FileUploader
      onFileDrop={(files) => {
        // Handle file drop event
      }}
      onFileChange={(files) => {
        // Handle file change event
      }}
      buttonLabel="Select file to upload"
      dropZoneLabel="Drag & drop files here"
      acceptedFileTypes={['image/png', 'image/jpeg', 'image/jpg', 'image/gif']}
      limit={5}
    />
  )
}
```

In this example, the `FileUploader` component is rendered in a function component. The component accepts several props, including `onFileDrop`, `onFileChange`, `buttonLabel`, `dropZoneLabel`, `acceptedFileTypes`, and `limit`. These props allow you to customize the behavior of the component.

## Props

The `FileUploader` component accepts the following props:

| Prop Name           | Type                      | Default Value                                           | Description                                                                                                          |
| ------------------- | ------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `onFileDrop`        | `(files: File[]) => void` | `(_) => { return }`                                     | Callback function triggered when files are dropped onto the drop zone. Receives an array of the dropped files.       |
| `onFileChange`      | `(files: File[]) => void` | `(_) => { return }`                                     | Callback function triggered when files are selected through the file input. Receives an array of the selected files. |
| `buttonLabel`       | `string`                  | `'Select file to upload'`                               | Text label displayed on the file selection button.                                                                   |
| `dropZoneLabel`     | `string`                  | `'Drag & drop files here'`                              | Text label displayed within the drag-and-drop area.                                                                  |
| `acceptedFileTypes` | `string[]`                | `['image/png', 'image/jpeg', 'image/jpg', 'image/gif']` | Array of allowed file types. Files not matching these types will be rejected.                                        |
| `limit`             | `number`                  | `5` (Allow five files to be uploaded at a time)         | Maximum number of files allowed for upload. Set to `null` for unlimited files.                                       |
