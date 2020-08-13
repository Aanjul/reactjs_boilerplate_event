// For refrence - https://www.geeksforgeeks.org/file-uploading-in-react-js/

// Run npm install axios --save to install required packages

import axios from 'axios';
import React,{Component} from 'react';

class App extends Component {
    state = {
        
        //Intially state where no file is selected
        selectedFile : null
    };

    //On file selecte (from the pop up)
        onFileChange = event => {

            //Update the state
            this.setState({selectedFile: event.target.files[0]});
        };

        //On file upload (click the upload button)
        onFileUpload = () => {

            const formData = new FormData();

            //Update the formData object
            formData.append(
                "myFile",
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            //Details of the uploaded file
            console.log(this.state.selectedFile);

            //Request made to the backend api
            //Send formData object
            axios.post("api/uploadfile", formData);

        };

        //File content to be displayed after
        //file upload is complete

        fileData = () => {
            if(this.state.selectedFile) {
                return (
                    <div>
                        <h2>
                            File Details:
                        </h2>
                <p>File name: {this.state.selectedFile.name}</p>
                <p>File Type:{this.sate.selectedFile.type}</p>
                <p>
                    Last Modified: {" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>
                    </div>
                );
            } else {
                return (
                    <div>
                        <br/>
                        <h4>
                            Choose before Pressing the Upload button
                        </h4>
                    </div>
                );
            }
        };

        render() {
            return (
                <div>
                    <h1>
                        Simple file Upload
                    </h1>
                    <h3>
                         Choose the file upload
                    </h3>
                    <div>
                        <input type="file" onChange={this.onFileChange}/>
                        <button onClick={this.onFileUpload}>
                            Upload!
                        </button>
                    </div>
                    {this.fileData()}
                </div>
            );
        }
}

export default App;