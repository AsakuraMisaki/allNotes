
package com.misaki.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ListView;

import com.misaki.myapplication.userRes.support.listView.ItemInList;
import com.misaki.myapplication.userRes.support.listView.MyAdapter;

import java.util.ArrayList;

/**steps:
 * [Create] class YourType, write constructor and setter/getter
 * [Declare] List<YourType> ItemsSet = new -(...), then ItemsSet.add(YourType.instances)
 * [Create] class MyAdapter extends Adapter/ArrayAdapter, override the abstract methods
 * -->[Core] in getView(...) method, setting the root view(the view for rendering) of listView,
 * with using LayoutInflater.from(Context.instance).inflate(resourceID, null);
 * then set the properties of each item needed to be rendered specially ;<--
 * [Note] when an adapter was set to an adapterView, the adapter will run its getView(...) to iterate迭代
 * the items in the bound list with {arg-int-position}, {arg-List<T>-objects}, then render the view;
 * */


public class ListViewTest extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_view_test);
        arrayListHandle();
    }

    private void arrayListHandle(){
        ArrayList<ItemInList> ItemsSet = new ArrayList<>();
        for(int i=0; i<6; i++){
            if(i%2 == 0 || i == 0){
                ItemInList item = new ItemInList("index:" + i, R.drawable.run);
                ItemsSet.add(item);
            }
            else {
                ItemInList item = new ItemInList("index:" + i, R.mipmap.ic_launcher_round);
                ItemsSet.add(item);
            }
        }
        MyAdapter adapter = new MyAdapter(ListViewTest.this, R.layout.single_img_text_list, ItemsSet);
        ListView renderList = findViewById(R.id.renderList);
        renderList.setAdapter(adapter);
    }
}
