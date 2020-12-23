   const quoteContainer=document.getElementById('quote-container');
   const quoteText=document.getElementById('quote');
   const quoteAuthor=document.getElementById('author');
   const twitterBtn=document.getElementById('twitter');
   const newQuoteBtn=document.getElementById('new-quote');
   const loader=document.getElementById('loader');

   const loading=()=>{
       loader.hidden=false;
       quoteContainer.hidden=true;
   }
   const complete=()=>{
       if(!loader.hidden){
           quoteContainer.hidden=false;
           loader.hidden=true;
       }
   }
   
   const getQuote=async()=>{
       loading()
   const api='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   try{
      const response=await fetch( api);
     const data=await response.json();
     if(data.quoteAuthor===''){
        quoteAuthor.innerText='unknown';
     }else{
      quoteAuthor.innerText=data.quoteAuthor;
     }
      if(data.quoteText.length>120){
          quoteText.classList.add('long-quote')
      }else{
          quoteText.classList.remove('long-quote')
      }
      quoteText.innerText=data.quoteText;
      complete()
   }catch(error){
       
       getQuote()
   }
}

const getTweet=()=>{
    const quote=quoteText.innerText;
    const author=quoteAuthor.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
    window.open(twitterUrl,'_blank')
}
twitterBtn.addEventListener('click',getTweet);
newQuoteBtn.addEventListener('click',getQuote);
getQuote();
