import { Component, OnInit } from '@angular/core';
import { SchemaService } from './schema.service';

@Component({
  selector: 'app-dyna-form',
  templateUrl: './dyna-form.component.html',
  styleUrls: ['./dyna-form.component.css'],
})
export class DynaFormComponent implements OnInit {
  selectedSet = 'ng-jsf';
  selectedSetName = '';
  selectedExample = 'ng-jsf-flex-layout';
  selectedExampleName = 'Flexbox layout';
  selectedFramework = 'material-design';
  selectedLanguage = 'en';
  visible: { [item: string]: boolean } = {
    options: true,
    schema: true,
    form: true,
    output: true,
  };
  formActive = false;
  jsonFormSchema: string;
  jsonFormValid = false;
  jsonFormStatusMessage = 'Loading form...';
  jsonFormObject: any;
  jsonFormOptions: any = {
    addSubmit: true, // Add a submit button if layout does not have one
    debug: false, // Don't show inline debugging information
    loadExternalAssets: true, // Load external css and JavaScript for frameworks
    returnEmptyFields: false, // Don't return values for empty input fields
    setSchemaDefaults: true, // Always use schema defaults for empty fields
    defautWidgetOptions: { feedback: true }, // Show inline feedback icons
  };
  liveFormData: any = {};
  formValidationErrors: any;
  formIsValid = null;
  submittedFormData: any = null;

  constructor(private schemaService: SchemaService) {}

  ngOnInit() {
    this.schemaService.getSchema('kitchen').subscribe(schema => {
      this.jsonFormSchema = JSON.stringify(schema);
      console.log('init: ', schema);
    });
  }

  formFromSchema(schema) {
    // Do you want generateForm to return the object?
    // The method was not returning anything so you were setting the value to nothing.
    // this.jsonFormObject = this.generateForm(this.jsonFormSchema);
    this.generateForm(this.jsonFormSchema);
    console.log(this.jsonFormSchema);
    console.log(this.jsonFormObject);
  }

  generateForm(newFormString: string): void {
    if (!newFormString) {
      return;
    }
    this.jsonFormStatusMessage = 'Loading form...';
    this.formActive = false;
    this.liveFormData = {};
    this.submittedFormData = null;

    // Most examples should be written in pure JSON,
    // but if an example schema includes a function,
    // it will be compiled it as Javascript instead
    try {
      // Parse entered content as JSON
      this.jsonFormObject = JSON.parse(newFormString);
      this.jsonFormValid = true;
    } catch (jsonError) {
      try {
        // If entered content is not valid JSON,
        // parse as JavaScript instead to include functions
        const newFormObject: any = null;
        /* tslint:disable */
        eval('newFormObject = ' + newFormString);
        /* tslint:enable */
        this.jsonFormObject = newFormObject;
        this.jsonFormValid = true;
      } catch (javascriptError) {
        // If entered content is not valid JSON or JavaScript, show error
        this.jsonFormValid = false;
        this.jsonFormStatusMessage =
          'Entered content is not currently a valid JSON Form object.\n' +
          'As soon as it is, you will see your form here. So keep typing. :-)\n\n' +
          'JavaScript parser returned:\n\n' +
          jsonError;
        return;
      }
    }
    this.formActive = true;
  }
}
