package com.misaki.myapplication.userRes.support.listView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.misaki.myapplication.R;
import java.util.List;

public class MyAdapter extends ArrayAdapter {

    private final int resourceID;
    private List<ItemInList> itemsSet;


    public MyAdapter(Context context, int resourceID, List<ItemInList> objects){
        super(context, resourceID, objects);
        this.itemsSet = objects;
        this.resourceID = resourceID;
    }

    @Override
    public ItemInList getItem(int position){
        return this.itemsSet.get(position);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent){
        View root = LayoutInflater.from(getContext()).inflate(resourceID, null);
        ItemInList item = getItem(position);
        ImageView img = root.findViewById(R.id.list_icon);
        TextView text = root.findViewById(R.id.list_info);
        img.setImageResource(item.getImgId());
        text.setText(item.getName());
        return root;
    }
}

