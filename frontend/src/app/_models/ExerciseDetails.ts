export class ExerciseDetails {
    exerciseId: string;
    exerciseName:string;   
    exerciseFor: string;
    equipment: string;
    createdBy:string;
    exerciseStatus:boolean;
    benefits:string;
    imageExercise: imageExercise[];
    skills:skills[];
    createdDate:Date;
    createdId:string;
 
}

export class skills {
    skillName:string;
}


export class imageExercise {
    imageName:string;
       
    }