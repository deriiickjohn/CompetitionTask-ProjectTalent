import React from 'react';
import Cookies from 'js-cookie';
import { Card, Popup, Button, Label, Icon} from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          tempID : null
        }
        
        this.selectJob = this.selectJob.bind(this)
        
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
   
      
        $.ajax({
          url : 'https://talentservicestalent20210826000957.azurewebsites.net/listing/listing/closeJob',
          headers : {
                'Authorization' : 'Bearer ' + cookies,
                'Content-Type' : 'application/json'
          },
          type : "POST",
          data: JSON.stringify(id),
          contentType: "application/json", 
          dataType: "json", 
          success : function(res){         
            this.props.reload();
          }.bind(this)
        })

        console.log(id);

    
      }

    render() {



      return(
            <Card style={{width:"380px",height: "400px", margin: "20px"}} >
              <Card.Content>
                <Card.Header>{this.props.roleName}</Card.Header>
                <Card.Meta>{`${this.props.city}, ${this.props.country}`}</Card.Meta>
                <Label color={'black'}  ribbon={"right"}> <span style={{marginLeft: "10px"}}> 0 <Icon name='user outline'/></span></Label>
                <Card.Description >
                  {this.props.description}
                 
                </Card.Description>
              </Card.Content>
              <Card.Content extra  >
              <div style={{display: "flex", flexDirection: "row", height:"40px"}} >


              <Button style={{ marginRight: '20px',width:"80px", backgroundColor:"red", color:"white", textAlign: "center"}} >
                    Expired
              </Button>
                
                  <div style={{marginLeft: "auto"}}>
                  <Button basic color='blue' onClick={ () =>  this.selectJob(this.props.id)}>
                    Close
                  </Button>
                  <Button basic color='blue'>
                    Edit
                  </Button>
                  <Button basic color='blue'>
                    Copy
                  </Button>
                  </div>
                  
                </div>
              </Card.Content>
            </Card>

      )
      
      

    }
}