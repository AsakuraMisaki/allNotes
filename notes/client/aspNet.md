# ASP.NET

### base relationship between an aspx and a cs

```asp
./Default.cs (top definition)
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="com_Default" %>

./Default.aspx.cs (CodeFile in its aspx)
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

///<summary>
///com_Default => Inherits in aspx ; System.Web.UI.Page => need to be extended to override the default page method
///</summary>
public partial class com_Default: System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
    {
    	//execute when loading page
    }
}
```