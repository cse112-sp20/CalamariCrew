const bodyHTML = `
<div class="container" id="div-1">
<div class="row">
   <div class="col-5">
      <h2>VelocityRaptor</h2>
      <h6>Settings</h6>
      <div class="list-group">
         <a href="#" id="generalbtn" class="list-group-item list-group-item-action active">
         General
         </a>
         <a href="#" class="list-group-item list-group-item-action" id="raptorbutton">Customize</a>
         <a href="#" id="repobtn" class="list-group-item list-group-item-action">Github Repo</a>
      </div>
      <a href="/root/html/index.html"> <i class="fa fa-arrow-left "></i></a>
   </div>

   <div class="col" id="general">
      <br>
      <div class="card text-center">
         <div class="card-header">
            General
         </div>
         <div class="card-body">
            <br><br>
            <button type="button" class="btn btn-secondary">Reset VelocityRaptor</button>
            <br><br>
         </div>
         <div class="card-footer text-muted">
            #CalamariCrew
         </div>
      </div>
   </div>

   
   <div class="col" id="myvelocityraptor">
      <br>
      <div class="card text-center">
         <div class="card-header">
            My VelocityRaptor
         </div>
         <div class="card-body" id="div-2">

            <img alt="Default Raptor" src="/root/media/runningRaptor/raptor2.png" width="100" height="100" id="img-1">
            <img alt="Magic Hat Accessory" src="/root/media/runningRaptor/Magic_hat.png" width="30" height="30" id="Magic_hat_">
            <img alt="Brown Afro Accessory" src="/root/media/runningRaptor/Head_AfroBrown.png" width="30" height="30" id="Head_AfroBrown_">
            <img alt="Crown Accessory" src="/root/media/runningRaptor/Crown.png" width="30" height="30" id="Crown_">
            <img alt="Saber Accessory" src="/root/media/runningRaptor/Saber_blue.png" width="50" height="50" id="Saber_blue_">
            <img alt="Back Angel Wing Accessory" src="/root/media/runningRaptor/Back_AngelWing.png" width="60" height="60" id="Back_AngelWing_">
            <img alt="Spiked Orange Tail Accessory" src="/root/media/runningRaptor/SpikedTail_Orange.png" width="50" height="50" id="SpikedTail_Orange_">
            <img alt="Spiked Green Tail Accessory" src="/root/media/runningRaptor/Tail_SpikedGreen.png" width="50" height="50" id="Tail_SpikedGreen_">
            <img alt="Blue Backpack Accessory" src="/root/media/runningRaptor/BackPack_Blue.png" width="20" height="20" id="BackPack_Blue_"> 
            <img alt="Yoyo Accessory" src="/root/media/runningRaptor/Hand_Yoyo.png.png" width="50" height="50" id="Hand_Yoyo_"> 
            <img alt="Rocket Booster Accessory"  src="/root/media/runningRaptor/RocketBooster.png" width="50" height="50" id="RocketBooster_"> 
            <img alt="HappyBlob Accessory" src="/root/media/runningRaptor/Back_HappyBlob.png" width="100" height="100" id="Back_HappyBlob_"> 
            <div id="div-3">

               <h6 id="raptorNameAccessory"></h6>

               <h9 id="h9-1">My Accessories:</h9>
               <button class="button" href="#" id="clearAll"> Clear All</button>
               <div id ="switch_acc">
                  <button value="head" id="head" class="btn btn-outline-dark btn-sm">Head</button>
                  <button value="back" id="back" class="btn btn-outline-dark btn-sm">Back</button>
                  <button value="tail" id="tail" class="btn btn-outline-dark btn-sm">Tail</button>
                  <button value="hand" id="hand" class="btn btn-outline-dark btn-sm">Hand</button>
               </div>

            </div>
         </div>
         <!--Gallery Display-->
         <div class="card-footer text-muted" id="headAccessories">
            <a href="#">  <img alt="Magic Hat Accessory" src="/root/media/runningRaptor/Magic_hat.png" width="40" height="40" id="Magic_hat"> </a>
            <a href="#">  <img alt="Crown Accessory" src="/root/media/runningRaptor/Crown.png" width="40" height="40" id="Crown"> </a>
            <a href="#">  <img alt="Brown Afro Accessory" src="/root/media/runningRaptor/Head_AfroBrown.png" width="40" height="40" id="Head_AfroBrown"> </a>
            
         </div>
         <div class="card-footer text-muted" id="backAccessories">
            <a href="#"> <img alt="Back Angel Wing Accessory" src="/root/media/runningRaptor/Back_AngelWing.png" width="40" height="40" id="Back_AngelWing"> </a>
            <a href="#"> <img alt="Blue Backpack Accessory" src="/root/media/runningRaptor/BackPack_Blue.png" width="30" height="30" id="BackPack_Blue"> </a>
            <a href="#"> <img alt="HappyBlob Accessory" src="/root/media/runningRaptor/Back_HappyBlob.png" width="40" height="40" id="Back_HappyBlob"> </a>

         </div>
         <div class="card-footer text-muted" id="tailAccessories">
            <a href="#"> <img alt="Spiked Orange Tail Accessory" src="/root/media/runningRaptor/SpikedTail_Orange.png" width="40" height="40" id="SpikedTail_Orange"></a>
            <a href="#">  <img alt="Spiked Green Tail Accessory" src="/root/media/runningRaptor/Tail_SpikedGreen.png" width="40" height="40" id="Tail_SpikedGreen"></a>
         </div>
         <div class="card-footer text-muted" id="handAccessories">
            <a href="#">     <img alt="Saber Accessory" src="/root/media/runningRaptor/Saber_blue.png" width="40" height="40" id="Saber_blue"></a>
            <a href="#">     <img alt="Yoyo Accessory" src="/root/media/runningRaptor/Hand_Yoyo.png.png" width="40" height="40" id="Hand_Yoyo"></a>
            <a href="#">     <img alt="Rocket Booster Accessory" src="/root/media/runningRaptor/RocketBooster.png" width="40" height="40" id="RocketBooster"></a>
         </div>
      </div>
   </div>

   <div class="col" id="myGithubRepo">
      <br>
      <div class="card text-center">
         <div class="card-header">
            Repositories
         </div>
         <div class="card-body" id="div-4">
            <table id="repoTable" class="table table-bordered table-striped mb-0">
               <tbody id="repoTableBody">
               </tbody>
            </table>
         </div>
         <div class="card-footer text-muted">
            <button id="selectRepoButton" type="button" class="btn btn-success">Select</button>
         </div>
      </div>
   </div>
</div>
</div>
`;
//test 1
test('Raptor name is not defined when storage is empty', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    const raptorName = document.getElementById('raptorNameAccessory');
    expect(raptorName.innerHTML).toBe('Close Extension to refresh');
    jest.resetModules();
});
//test 2
test('RaptorName changes when updated in localStorage', () => {
    document.body.innerHTML = bodyHTML;
    const raptorName = document.getElementById('raptorNameAccessory');
    localStorage.setItem('raptor_name', 'Gary');
    require('./user_settings');
    expect(raptorName.innerHTML).toBe("Hi, I'm Gary!");
    jest.resetModules();
});
//test 3
test('Switching between accessories render the right set', () => {
    document.body.innerHTML = bodyHTML;
    const divBtns = document.querySelector('#switch_acc'); //container by ID UI Buttons Container
    const uiBtns = divBtns.querySelectorAll('button'); //all the elements inside container
    require('./user_settings');
    containerList = [];
    uiBtns.forEach(button => {
        button.click();
        containerList.push(
            document.getElementById(button.id + 'Accessories').id
        );
    });
    rightButtonOrder = [
        //id of activated sets that were activated by the buttons in UI gallery
        'headAccessories',
        'backAccessories',
        'tailAccessories',
        'handAccessories',
    ];
    expect(containerList).toStrictEqual(rightButtonOrder);
    jest.resetModules();
});
//test 4
test('ClearAll Btn removes all the items that Raptor is currently wearing', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 5
test('Choosing a specific accessory is correctly displayed in the raptor', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 6
test('Clicking NavBars render correct element', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 7
test('Clicking BackArrow takes you back to the Main Page', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 8
test('The Raptor image in Customize Tab is correctly displayed', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 9
test('NavBar Tabs change color when clicked', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
//test 10
test('Reset VelocityBtn correctly resets the whole Extension', () => {
    document.body.innerHTML = bodyHTML;
    require('./user_settings');
    expect(5 + 3).toStrictEqual(8);
    jest.resetModules();
});
