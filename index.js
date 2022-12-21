const express = require('express');
const app = express();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://harshak02:jntucse1234@cluster0.sttwkrc.mongodb.net/Sem", {useNewUrlParser: true});

//concurrent Medical Conditions Helper
const MedicalCondition = {
    name : {
        type : String
    },
    diagnosisDate : {
        type : Date
    },
    treatmentMedications : {
        type : [String]
    }
};

//Past Medical Conditions Helper-1
const MedicinalProduct = {
    name : {
        type : String
    },
    frequency : {
        type : Number
    },
    usageRecomendations : {
        type : String
    }
};

//Past Medical Conditions Helper-2
const MedicalConditionP = {
    name : {
        type : String
    },
    diagnosisStartDate : {
        type : Date
    },
    diagnosisEndDate : {
        type : Date
    },
    medicines : {
        type : [MedicinalProduct]
    }
    
};

//Risk Factors Helper
const RiskFactorsHelper = {

    isPregnent : {
        type : Boolean,
    },

    pregnencyCondition : {
        type : String
    },

    isSmoking : {
        type : Boolean,
    },

    ifStoppedDate : {
        type : Date
    },

    isAlcohol : {
        type : Boolean,
    },

    frequency : {
        type : Number
    },

    isDrugAllergic : {
        type : Boolean,
        require : true
    },

    names : {
        type : [String]
    }

};

const PatientSchema = new mongoose.Schema({

    PId : {
        type : Number,
    },

    Name : {
        type : String,
    },
    
    Age : {
        type : Number,
    },

    Gender: {
        type : String,
    },

    Weight : {
        type : Number,
    },

    RiskFactors : RiskFactorsHelper,

    ConcurrentMedicalConditions : {
        nameOfMedicalCondition : {
            type : [MedicalCondition],
        }
    },

    PastMedicalConditions : {
        nameOfMedicalCondition : {
            type : [MedicalConditionP],
        }
    }

});

const Patient = mongoose.model('Patient',PatientSchema);


app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){

    const newPatient = new Patient({
        pid : 1234,
        Name : req.body.fName,
        Age : req.body.Age,
        Gender : req.body.gender,
        Weight : req.body.weight,
        RiskFactors : {
            isPregnent : req.body.Pregnancy,
            pregnencyCondition : req.body.Stage,
            isSmoking : req.body.Smoking,
            ifStoppedDate : req.body.StoppedDate,
            isAlcohol : req.body.Alcohol,
            frequency : req.body.frequency,
            isDrugAllergic : req.body.Allergy,
            names : [req.body.AllergyName], 
        },
        ConcurrentMedicalConditions : {
            nameOfMedicalCondition : [{
                name : req.body.ConditionName,
                diagnosisDate : req.body.ApproxDateForMedicalCondition,
                treatmentMedications : [req.body.MedicationName],

            }]
        },
        PastMedicalConditions : {
            nameOfMedicalCondition : [{
                name : req.body.MedicalName,
                diagnosisStartDate : req.body.ApproxStartDateForPastMedicalCondition,
                diagnosisEndDate : req.body.ApproxEndDateForPastMedicalCondition,
                medicines : [
                    {
                        name : req.body.NameOfMedicalProduct,
                        frequency : req.body.frequencyForMedicine,
                        usageRecomendations : req.body.UseageRecomendations                    
                    }
                ]

            }]
        },

    });
    newPatient.save();
    res.send("Done");
});

app.listen(3000,function(){
    console.log("server running at port 3000 ");
})