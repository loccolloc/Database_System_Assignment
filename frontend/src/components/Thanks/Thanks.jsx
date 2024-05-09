import { useNavigate } from 'react-router-dom'; 

const Thanks = () => {
    const navigate = useNavigate(); 

  
   
  return (
    <div className="mt-8 ml-10 mr-10" style={{height:'507px'}}>
  <div className="jumbotron text-center">
  <h1 className="display-3">Thank You!</h1>
  <p style={{marginTop:'50px'}} className="lead"><strong>Thanks for shopping with us!</strong></p>
  <p style={{marginTop:'5px'}} className="lead"><strong>Hope you have a good day!</strong></p>

  <div style={{marginTop:'50px'}}><hr /></div>
  
  <p className="lead mt-10">
    <a className="btn btn-primary btn-lg" role="button" onClick={()=>{navigate('/listproducts'); }}>Continue shopping</a>
  </p>
</div>
</div>
  );
};

export default Thanks;
