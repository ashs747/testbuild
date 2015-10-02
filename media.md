Old workflow

## Adding a file 

Click "browse files" and select something
State.loading = true
Set the file thumbnail to the default thumb, and its display name to "uploading..."
Update a gloabl file count
Updates a FileUploadList component with a new file (not needed because its in app state now)
Call plupload.start(); (begins the local upload)


## onProgress

leave for now


## File uploaded

Data is passed back as a json string from the upload endpoint
response = JSON.parse(data.response)
response.optimisedFile is the location of the file on the local server
the uploader list is updated with the new file and its response
the file is sent to the "generate variations" endpoint.
The file path is sent, along with an object, {medium: {width: 400}


## Generate Variations

Post made to {url}/variation-generator with a stringified response made up of the following
<pre>
{original: "filepath", variations: {variationsObject}}
</pre>
Invokes a callback: onGenerateVariations


## OnGenerateVariations

Data is passed back in the following format
	original: file path of originally uploaded file
	mimeType,
	variation: medium (defined in the arguments passed in)
	reference: path of the file
	previewUrl: a preview url

A call is made to the uploaderList to get the array of currently uploaded files
A where underscore check is used to find the file where the file.path is equal to the response.original
If one is found, a variations key is added, file.variations = []
Each variation is looped through and the reference is added
So the end goal being : 

<pre>
file.variations = [
	variation (response from the server)
]
</pre>

If there is a preview url and it has a http://* then set it as the files .thumbnail property or append the config.api.url then append it.
Update the uploaderList with the new file.
