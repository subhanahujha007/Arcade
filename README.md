# java-dsa
package com.company;


import java.io.InputStream;
import java.util.Scanner;

public class Main {
    public static void solutions(int qpsf, int n,int row,int col,String asf) {
        if (row == n ) {
            if(qpsf==n){
            System.out.print(asf);
            }
        return;
        }
        int nr=0;
        int nc=0;
        String yasf="";
                String nasf="";
            if(nc==n-1) {
            nc=0;
            nr=row+1;
            yasf=asf+"q\n";
            nasf=asf+"-\n";
            }
            else {
            nc=col+1;
            nr=row;
                yasf=asf+"q";
                nasf=asf+"-";
            }
        solutions(qpsf+1,n,nr,nc,yasf);

        solutions(qpsf+0,n,nr,nc,nasf);
            }
  public static void main(String[] args)throws Exception{
      Scanner sc=new Scanner(System.in);
      int n=sc.nextInt();
      solutions(0,n,0,0,"");
  }
}

