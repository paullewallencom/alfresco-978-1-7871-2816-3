
import { Component, AfterViewChecked, ViewChild, Input } from '@angular/core';
import { ALFRESCO_TASKLIST_DIRECTIVES } from 'ng2-activiti-tasklist';
import { ACTIVITI_PROCESSLIST_DIRECTIVES } from 'ng2-activiti-processlist';
import { ActivitiForm } from 'ng2-activiti-form';

declare let __moduleName: string;
declare var componentHandler;

@Component({
  moduleId: __moduleName,
  selector: 'activiti-demo',
  templateUrl: './activiti-demo.component.html',
  styleUrls: ['./activiti-demo.component.css'],
  directives: [ALFRESCO_TASKLIST_DIRECTIVES, ACTIVITI_PROCESSLIST_DIRECTIVES, ActivitiForm]
})
export class ActivitiDemoComponent implements AfterViewChecked {

  currentChoice: string = 'task-list';

  @ViewChild('activitidetails')
  activitidetails: any;

  @ViewChild('activititasklist')
  activititasklist: any;

  @ViewChild('activitiprocesslist')
  activitiprocesslist: any;

  @ViewChild('activitiprocessdetails')
  activitiprocessdetails: any;

  currentTaskId: string;
  currentProcessInstanceId: string;

  taskSchemaColumns: any [] = [];
  processSchemaColumns: any [] = [];

  taskFilter: any;
  processFilter: any;

  @Input()
  appId: string;

  setChoice($event) {
    this.currentChoice = $event.target.value;
  }

  isProcessListSelected() {
    return this.currentChoice === 'process-list';
  }

  isTaskListSelected() {
    return this.currentChoice === 'task-list';
  }

  constructor() {
    this.taskSchemaColumns = [
      {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true}
      // {type: 'text', key: 'created', title: 'Created', sortable: true}
    ];
    this.processSchemaColumns = [
      {type: 'text', key: 'name', title: 'Name', cssClass: 'full-width name-column', sortable: true}
    ];
  }

  onTaskFilterClick(event: any) {
    this.taskFilter = event;
    this.activititasklist.load(this.taskFilter);
  }

  onProcessFilterClick(event: any) {
    this.processFilter = event.filter;
    this.activitiprocesslist.load(this.processFilter);
  }

  onTaskRowClick(taskId) {
    this.currentTaskId = taskId;
    this.activitidetails.loadDetails(this.currentTaskId);
  }

  onProcessRowClick(processInstanceId) {
    this.currentProcessInstanceId = processInstanceId;
    this.activitiprocessdetails.load(this.currentProcessInstanceId);
  }

  processCancelled(data: any) {
    this.currentProcessInstanceId = null;
    this.activitiprocesslist.reload();
  }

  taskFormCompleted(data: any) {
    this.activitiprocesslist.reload();
  }

  ngAfterViewChecked() {
    // workaround for MDL issues with dynamic components
    if (componentHandler) {
      componentHandler.upgradeAllRegistered();
    }
  }

}
