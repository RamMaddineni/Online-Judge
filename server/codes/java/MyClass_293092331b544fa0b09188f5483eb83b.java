import java.util.Scanner;
 
public class MyClass_293092331b544fa0b09188f5483eb83b {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        for (int i = 0; i < n; i++) {
            int x=sc.nextInt();
            int k=sc.nextInt();
            if(x%k==0){
                System.out.println(2);
                System.out.println(x-1+" "+1);
            }else{
                System.out.println(1);
                System.out.println(x);
            }
        }
        sc.close();
    }
}