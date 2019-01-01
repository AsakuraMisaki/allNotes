# API Attention

* findViewById(int)

>AppCompatActivity
>all of the functions must after setContentView(R.layout.layout_file_name)

* AndroidMainifest.xml

`<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
	</activity>`

>delete <intent-filter/>, <action/> and <category/> to avoid generating one more (child) application

>simply add activity
`<activity android:name=".MainActivity">
	</activity>`


* AdapterView + Adapter + List (eg. ListViewTest.java)

>/**steps:
 * [Create] class YourType, write constructor and setter/getter
 * [Declare] List<YourType> ItemsSet = new -(...), then ItemsSet.add(YourType.instances)
 * [Create] class MyAdapter extends Adapter/ArrayAdapter, override the abstract methods
 * -->[Core] in getView(...) method, setting the root view(the view for rendering) of listView,
 * with using LayoutInflater.from(Context.instance).inflate(resourceID, null);
 * then set the properties of each item needed to be rendered specially ;<--
 * [Note] when an adapter was set to an adapterView, the adapter will run its getView(...) to iterate迭代
 * the items in the bound list with {arg-int-position}, {arg-List<T>-objects}, then render the view;
 * */