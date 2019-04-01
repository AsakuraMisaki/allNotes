# Unity_C4D
> noting issues about development which is dependent on C4D&Unity(201835f Personal)

### MODS
#### Fbx

* `issues`
> fbx entrance disappear when rendering, position error (x/y/z fresh);
* `guess`
> unity sets the [axis 轴心] of the mod entrance after importing the mod, if the original mod file(like .c4d) changed the axis of the mod in its animation, conflict happens in the animation of the mod;
* `resolution`(unity_mods_0/1.png)
> avoid existing only one (present/root) object, you can dynamically change the position of any object or all objects in animation, but do not make the original mod file exists only one (present/root) object, otherwise you can not change the position of the object due to the mod explaination of unity 