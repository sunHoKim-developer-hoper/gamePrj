export default class GiveProblem{

    constructor(){

        //출제용 문제
        this.giveproblem = [];
        //1,2,3
        this.difficulty = 0;
        this.count = 0;
        
        this.countTmp = 0;

        this.problemList = [` System.out.println(); 
        `,` FileInputStream fis = new FileInputStream(path);
    Scanner sc = new Scanner(fis);
    String str = sc.nextLine();
    String [] temp = str.split(" ");
                                `,
                                // 로또문제
            `int idx_num = 0;
            int lotto_num[] = new int[6]; 
            
            String result_txt = "";
            
            for(int i=1; i<=30; i++){ 
                
                result_txt = "";
                result_txt += idx_num+1; 
            
                for(int j=0; j<=5; j++){
                    int num_temp = (int) (Math.random()*44+1);
                    lotto_num[j] = num_temp; 
                } 
                } `
                ,
                `Arrays.sort(lotto_num);
                boolean duple = false;
                for(int k=0; k<lotto_num.length; k++){ 
                    
                    if(k==lotto_num.length-1) {  
                        result_txt += lotto_num[k]+" ]"; 
                        
                    }else if(lotto_num[k]!=lotto_num[k+1]){
                        result_txt += lotto_num[k]+", \t"; 
                        
                    }else { 
                        duple = true;
                    }`
                    ,
                
            `while (sc.hasNext()) {
                        String str = sc.nextLine();
                        tokens = str.split(",");
                        if (tokens[0].equals("id"))
                            continue;
                        count++;
                    }
                    students = new Student[count ];
                    System.out.println(count);
            `,
            ` public void shuffle() {
                Random rand = new Random();
                for (int i = 0; i < 50; i++) {
                    int s = rand.nextInt(students.length);
                    int d = rand.nextInt(students.length);
                    Student temp;
                    temp = students[s];
                    students[s] = students[d];
                    students[d] = temp;
                }
            }'
            
        
        }`,
        `class Employee implements Comparable<Employee> {
            private int empId;
            private String name;
            public int getEmpId() {
            return empId;
            }
            public String getName() {
            return name;
            }
            Employee(int empId, String name) {
            this.empId = empId;
            this.name = name;
            }
            @Override
            public int compareTo(Employee e) {
            return e.empId - this.empId;
            }
            }`
            ,` public void sort() {
                Student temp;
                for (int j = 0; j < students.length - 1; j++) {
                    for (int i = 0; i < students.length - 1 - j; i++) {
                        int curId = students[i].getId();
                        int nextId = students[i+1].getId();
                        if (curId > nextId) {
                            temp = students[i];
                            students[i] = students[i + 1];
                            students[i + 1] = temp;
                        }
                    }
                }
            }
        `
        //    레벨2
            ,	`private static int max(int[] data) {
            if(data == null ||data.length == 0)
                return -999999;
            int max = data[0];
            for(int i = 0 ; i < data.length - 1 ; i++) {
                if(data[i + 1] > max)
                    max = data[i + 1];
            }
            return max;
        }`,


        //레벨1
        `private static int abs(int value) {
            value = (value > 0) ? value : - value;  
            return value;
        }`,

        //레벨2
        `public static void main(String[] args) {
            {
            int i = 0, num = 0, tmp = 0;
            
            while(i <= 20) {
                
                if((num % 2 !=0 && num % 3 !=0)) {
                    tmp += num;
                    System.out.println(num);
                }		
                i++; num++;
            }
            System.out.println(tmp);
            }		
        }`]



        // this.sortProblem();

    }

    get length(){
        return this.count;
    } 


    sortProblem(){

        let length = [];

        this.problemList.forEach((problem, index) =>{

            //문제 하나를 보냄
            this.measureLength(problem);

            //문자열 수를 길이배열에 보내줌
            length[index] = this.countTmp;
        })


        //문제 정렬하기

        for(let j = 0 ; j < length.length -1 -1 ; j++)
            for(let i = 0 ; i < length.length - 1 - j; i++){

                //오름차순정렬
                if(length[i] > length[i+1]){

                    //길이 바꿔주기 
                    let temp = length[i];
                    length[i] = length[i+1];
                    length[i+1] = temp;

                    //진짜 문제 순서 바꿔주기
                    let tempProblem = this.problemList[i];
                    this.problemList[i] = this.problemList[i+1];
                    this.problemList[i+1] = tempProblem;

                }

            }

        

    }

    //한 문제 받음
    measureLength(problem){

        this.countTmp = 0;
        
        let trimArray = [];

        //배열로 쪼개주기
        let stringSplit = problem.split("\n");;
        
        //앞뒤 잘라주기
        for(let i in stringSplit){
            trimArray[i]
            = stringSplit[i].trim();
        }
        
        //잘린 후의 인덱스마다 count 합을해줌
        for(let tmp of trimArray){

            this.countTmp += tmp.length;

        }



    }


//-----------------------------------



    //난이도 및 길이 측정
    measureDifficultry(problem){

        this.count = 0 ;
       
    //길이측정
        for(let tmp of this.giveproblem){
        // for(let tmp of problem){

            this.count += tmp.length;
        }

        

    //난이도측정
        //400이상일 때 난이도3
        if(this.count > 400){
            this.difficulty = 3;
        }
        else if (this.count > 300){
            this.difficulty = 2;
        }
        else if (this.count > 150){
            this.difficulty = 1;
        }

    }


    //문제배열을 개별 문제로 변환기
    covert(stringArray){

        //배열의 특정인덱스를 문자열로 저장
        let string = stringArray;
        // measureDifficultry(string);

        //문자열을 배열로 쪼개기
        let stringSplit= string.split("\n");

        //배열을 앞뒤 공백을 없애고 결국 저장
        for(let i in stringSplit){
            this.giveproblem[i]
                = stringSplit[i].trim();
        }

    }

}