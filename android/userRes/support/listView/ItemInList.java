package com.misaki.myapplication.userRes.support.listView;

public class ItemInList{

    private String name = null;
    private int imgId = 0;

    public ItemInList(String name, int imgId){
        this.name = name;
        this.imgId = imgId;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setImgId(int id){
        this.imgId = imgId;
    }

    public String getName(){
        return this.name;
    }

    public int getImgId(){
        return this.imgId;
    }

}

