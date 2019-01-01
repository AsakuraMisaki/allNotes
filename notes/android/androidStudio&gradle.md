# Android Studio And Gradle

## About Gradle

>total info see https://docs.gradle.org/current/userguide/userguide.html

## Getting Start

>when first create a new android project by using studio, do not open offline work(setting>Build+>Gradle) if you do not create an available gradle version for studio *manually手动地*, let studio download available gradle(s) for your project,
fix the errors before running your project, after first test(running success and closing), open offline work option may make the compile process faster.

### Errors ref(*indistinct模糊的*)

* layout view fail

>if you did not change anything after project *initialization初始化*, probably error happened in your styles.xml(app>res>values>styles.xml) change from <p>`<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">`</p> to `<style name="AppTheme" parent="Base.Theme.AppCompat.Light.DarkActionBar">`

* no cache version for com.android.tools.build:gradle:${version}

>use your local cached gradle jar: check ${gradle_path}(setting>Build+>Gradle>Service directory path) like D:\GitHub\gradle\caches\modules-2, find in any of the folders(usually two folders), then change build.gradle(project)
`dependencies {classpath 'com.android.tools.build:gradle:${local version}'}`, gradle build again

**(!) learn gradle to fix more errors** 

### Gradle Notes

* *repository仓库* setting

>add environment variable(GRADLE_USER_HOME: ${localRepository}), this for changing cached dependencies location to build gradle offline `cd projectLocation` `gradle build --offline`

>modify build.gradle(project), use mirror site to download repositories(faster)
`buildscript {
	//default setting(android studio)
    // repositories {
    //     google()
    //     jcenter()
    // }
    //download repositories from mirror site(faster)
    repositories {
        maven {
            url 'http://maven.aliyun.com/nexus/content/groups/public/'
        }
        mavenCentral()
    }
}`

### About *Optimization优化*(ref: https://blog.csdn.net/xwh_1230/article/details/60961723)

* offline work

>setting>Build+>Gradle, open offline work, use local gradle *distribution分布*: ${gradle_path/wrapper/dists/gradle-${version}-all/SHA/gradle-${version}}
>Settings->appearance &behavior->system setting->Updates, close the two options

* more ram for jvm *heap堆*

>${AndroidStudio_path}\bin\studio64(32).exe.vmoptions  
`#heap start ram
-Xms512m
#heap max ram 
-Xmx4096m
-XX:MaxPermSize=2048m
-XX:ReservedCodeCacheSize=1024m`
change the values on the basis of your machine

* optimize compiling(*Daemon thread守护线程* for studio, avoid studio close *accidentally意外地* with error occuring when copiling)

>${gradle_path} create gradle.properties, add
`# 编译时使用守护进程
org.gradle.daemon=true 
#JVM最大允许分配的堆内存，按需分配 
org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m  -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8
#使用并行编译
org.gradle.parallel=true  
org.gradle.configureondemand=true`