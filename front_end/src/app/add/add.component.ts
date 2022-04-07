import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service: ApiserviceService, private route: ActivatedRoute) { }

  errormsg: any;
  successmsg: any;
  getparamId: any;

  ngOnInit(): void {
    this.getparamId = this.route.snapshot.paramMap.get('id');
    if(this.getparamId){
      //get single data
    this.service.getSingleData(this.getparamId).subscribe((res:any)=>{
      console.log(res,"res==>");
      this.userForm.patchValue({
        fullname: res.data[0].fullname,
        address: res.data[0].address,
        phoneno: res.data[0].phoneno

      });
    });
    }
  }

  //Student data
  userForm = new FormGroup({
    "fullname": new FormControl('', Validators.required),
    "address": new FormControl('', Validators.required),
    "phoneno": new FormControl('', Validators.required)

  });

  //Create new student
  userSubmit() {
    if (this.userForm.valid && this.userForm!=null) {
      this.service.createData(this.userForm.value).subscribe((res) => {
        console.log(res, 'res==>');
        this.userForm.reset();
        this.successmsg = res.message;
      });
    } else {
      this.errormsg = "All fields are required!!";
    }
  }
  //Update student data
  updateStudent(){
    
    console.log(this.userForm.value,'update form');
    if(this.userForm.valid){
      this.service.updateData(this.userForm.value,this.getparamId).subscribe((res)=>{
        this.successmsg=res.message;
        this.getparamId="";
      })
    }else{
      this.errormsg = "Error in data updating";
    }
  }
}
