

/* ------------------------------------------------------------------------------------------------------------- 
*说      明：本程序用于动态添加和删除表格之行(TR)，并复制行中各标签，复制的标签对象将是表格中第一个含有标签的行 
            使用前请确保表格至少有一行可用来复制，并且各列的标签必须单一，而radio组必须先设名称(name)，name的字符串不能其它属性重复 
            在每行末尾的单元格(TD)内必须有一添加和删除行的按钮， 
            在按钮的onclick事件中分别调用addRow和delRow方法在该行的下面添加一行和删除该行。 
*使用方法：推荐(适用一个页面只处理一个表格的情况) 
            (1)initTable(table)            : 初始化表格，需传递表格的id或表格对象。在初始化页面时就需调用该函数。 
            (2)addRow()和delRow()        : 分别用于“添加”和“删除”按钮的onClick事件中 
            (3)setBaseName(aStrName)    : 在提交表单时，设置表格行中各列标签的名称(从左至右的标签名)。参数为一数组 
            (4)getCount()                : 在提交表单时,获取表格含有标签的总行数。 
                                            假设用户设置的某个标签name值为"txt"，最后表格中各行的标签name值 
                                            从上至下将变为"txt_0","txt_1"...，直至"txt_getCount()-1" 
            如果一个页面需要操作多个表格，则按下面方法 
            (1)addRow(table)和delRow(table)         
                分别用于“添加”和“删除”按钮的onClick事件中，在调用函数时必须传递表格id或表格对象 
            (2)setTable(table),setBaseName(aStrName)和getCount() 
                提交表单时，分别设置表格的id或表格对象以及标签名，这样才能得到各个表格含有标签的总行数 
*作    者：曾次清 
*日    期：2004年10月13日 
*提    示：如果操作发生了错误，请试着去掉addRow(table)和delRow(table)函数中的第一个注释，以检查。 
*备    注：目前支持的标签有"INPUT","TEXTAREA","SELECT"， 
            如果要支持更多标签，请修改数组A_TAG_NAME和initTagValue(objTd)函数相应地方。 
-------------------------------------------------------------------------------------------------------------- */ 
var m_objTable;                //需要操纵的表格对象 
var m_strError;                //错误信息 
var m_aStrTagName;            //标签名，为一个数组，长度为表格的列数 

var m_aBgColor;                //各个单元格背景色，数组 
var m_aRowHtml;                //各个单元格内的html，数组 
var m_aHeight;                //各个单元格高度，数组 
var m_aAlign;                //各单元格水平对齐方式 

//设置支持的标签 
var A_TAG_NAME = new Array("INPUT","TEXTAREA","SELECT"); 


// ----------------------  初始化表格  ---------------------- // 

function initTable(table) 
{ 
    if( typeof(table) == "undefined" ) 
    { 
        alert("请传入参数：表格对象或表格id！"); 
        return; 
    } 
    setTable(table);     
    getRowProperty(getStartRow());        //获取行的相关属性 
}//end initTable(table) 


// -------------------  设置表格id或者表格对象 ------------------- // 
//如果不用此函数设置，则调用addRow和delRow函数时必须设置 

function setTable(table)           
{ 
    if(typeof(table) == "string") 
        this.m_objTable = getObjTableByID(table); 
    else if(typeof(table) == "object") 
        this.m_objTable = table; 
} 

// ---------------------- 设置表格各列中标签（HTML标签）的初始名称  ---------------------- // 

function setBaseName(aStrName) 
{ 
    if(typeof(m_objTable) == "undefined") 
    { 
        alert("您没有设置表格对象或表格id"); 
        return; 
    } 
    m_aStrTagName = aStrName; 
    setTagName(getStartRow(),getEndRow(),0); 
}//end setBaseName 

// ---------------------- 获取动态表格行数  ---------------------- // 
//只是能动态添加和删除的行数 
function getCount() 
{ 
    return (getEndRow() - getStartRow() + 1); 
} 

// ---------------- 在当前行的下方添加一行  ---------------- // 

function addRow(table) 
{ 
    //if(!isParameterTrue(addRow,table))    {alert(m_strError);return;} 
    if( typeof(table) != "undefined" )    initTable(table); 
     
    //得到当前行的索引 
    var intRowIndex = getRowIndex(); 
    var intNewTrIndex = intRowIndex + 1; 
    var aStrRowHtml = getNewRowHtml(getStartRow()); 
    m_objTable.insertRow(intNewTrIndex); 
     
    //将当前行各单元的innerHTML赋予新增行对应的各单元格 
    for(var i = 0;i < aStrRowHtml.length;i ++) 
    { 
        m_objTable.rows(intNewTrIndex).insertCell(); 
        m_objTable.rows(intNewTrIndex).cells(i).align = m_aAlign[i]; 
        if( m_aBgColor[i] != "") 
        { 
            m_objTable.rows(intNewTrIndex).cells(i).bgColor = m_aBgColor[i]; 
        } 
        if( m_aHeight[i] != "") 
        { 
            m_objTable.rows(intNewTrIndex).cells(i).height = m_aHeight[i]; 
        } 
        m_objTable.rows(intNewTrIndex).cells(i).innerHTML = aStrRowHtml[i]; 
        //最后一列为“添加行”、“删除行”的按钮，不需要赋予初值，其它列需要 
        if( i != (aStrRowHtml.length - 1)) 
            initTagValue(m_objTable.rows(intNewTrIndex).cells(i)); 
    } 
}//end addRow 

// ---------------------------- 删除当前行  ---------------------------- // 

function  delRow(table)   
{   
    try   
    {   
        //if(!isParameterTrue(delRow,table))    {alert(m_strError);return;} 
        if( typeof(table) != "undefined" )        setTable(table); 
         
        var Elm  =  event.srcElement; 
        while(Elm  &&  Elm.tagName  !=  "TR")   
        {   
            Elm  =  Elm.parentElement;   
        } 
        var intThisIndex = Elm.rowIndex; 
        Elm.parentElement.deleteRow(intThisIndex);   
    }   
    catch(ex)   
    {   
        alert("delRow() Err  5001:\r\n"  +  ex);   
        m_strError += "delRow() Error" + ex; 
    }   
}//end delRow() method 

// -------------------------  根据表格id得到表格对象  ------------------------- // 
//如果该id不存在，则返回null 
function getObjTableByID(tableID) 
{ 
    return document.getElementById(tableID); 
} 

/* ------------------------------------------------------------------------------------------------------ 
*功  能：设置各个单元格中标签名称，将从指定的起始行设置到指定的结束行 
*参  数：intStartRow ：开始要设置名称的标签所在行索引 
            intEndRow : 最后要设置名称的标签所在行索引 
            intStartNo : 标签的起始编号，逐个增加 
------------------------------------------------------------------------------------------------------ */ 
function setTagName(intStartRow,intEndRow,intStartNo) 
{ 
    for( var i = intStartRow; i <= intEndRow;i ++ ) 
    { 
        for( var j = 0;j < m_aStrTagName.length;j ++ ) 
        { 
            var strBaseName = m_aStrTagName[j]; 
            var strTagName = strBaseName + "_" + intStartNo; 
            var objTd = m_objTable.rows(i).cells(j); 
            var objTagList; 
            for(var m = 0;m < A_TAG_NAME.length;m ++) 
            { 
                objTagList = objTd.getElementsByTagName(A_TAG_NAME[m]); 
                if( objTagList.length != 0 ) 
                    break; 
            } 
            if( objTagList.length == 0 ) 
            { 
                alertTagName(); 
                return; 
            } 
            for( var m = 0; m < objTagList.length;m ++ ) 
                objTagList[m].setAttribute("name",strTagName); 
        } 
        intStartNo ++; 
    } 
}//end setTagName() method 

// ----------------------------------  给标签赋予初值   ---------------------------------- // 

//将文本框赋予空值，如果是radio、checkbox标签，则将它们checked属性设为false 
//如果是select标签，则选中第一行 

function initTagValue(objTd) 
{ 
    var strSetValue = ""; 
    var strInputType = "";        //input标签的型别，如radio，checkbox等 
    var objTagList; 
    var strTagName; 
    for( var i = 0;i < A_TAG_NAME.length;i ++ ) 
    { 
        objTagList = objTd.getElementsByTagName(A_TAG_NAME[i]); 
        if( objTagList.length != 0 ) 
        { 
            strTagName = A_TAG_NAME[i]; 
            break; 
        } 
    } 
    for( var m = 0; m < objTagList.length;m ++ ) 
    { 
        switch(strTagName) 
        { 
            case "INPUT" : 
                    strInputType = objTagList[m].type; 
                    if( strInputType == "text" ) 
                        objTagList[m].setAttribute("value",strSetValue); 
                    else if( strInputType == "radio" ||  strInputType == "checkbox") 
                        objTagList[m].setAttribute("checked",false); 
                break; 
                 
            case "TEXTAREA" : 
                    objTagList[m].setAttribute("value",strSetValue); 
                break; 
            case "SELECT" : 
                    objTagList[m].setAttribute("selectedIndex",0); 
                break; 
        }//end switch 
    }//end for 
}//end initTagValue(objTd) 

/* ------------------------------------------------------------------------------------------------------ 
*功  能：判断调用各个方法传入的参数是否正确，并得到错误信息，如正确，则错误信息为空 
*参  数：objFunction : 调用该函数的函数名 
            table ：表格id或者表格对象 
  ------------------------------------------------------------------------------------------------------ */ 
function isParameterTrue(objFunction,table) 
{ 
    m_strError = ""; 
    var bolRet = true; 
    var intParaLen = objFunction.arguments.length; 
    if(intParaLen > 1) 
    { 
        m_strError +=  "对不起，传入该方法的参数至多只能为一个，即表格id或表格对象！\n"; 
        bolRet = false; 
    } 
    if(intParaLen == 1)    {setTable(table);} 
    if(typeof(m_objTable) == "undefined" || m_objTable == null) 
    { 
        m_strError += "目前您传入的参数不正确！\n您需传入表格id或者表格对象！\n"; 
        bolRet = false; 
    } 
    else 
    {//m_objTable为null时，使用m_objTable.tagName有错 
        if(m_objTable.tagName != "TABLE") 
        { 
            m_strError += "您设置的参数不是表格的id或表格对象！\n"; 
            bolRet = false; 
        } 
    } 
    return bolRet; 
}//end isParameterTrue 

// ---------------  当标签超出规定范围（A_TAG_NAME）时，弹出对话框 ---------------  // 

function alertTagName() 
{ 
    var strTagName = ""; 
    for(var m = 0;m < A_TAG_NAME.length;m ++) 
        strTagName = strTagName + A_TAG_NAME[m] + ","; 
    strTagName = strTagName.substring(0,strTagName.lastIndexOf(",")) + "."; 
    alert("对不起，目前支持的标签仅限：" + strTagName + "\n。请在JS文件中添加你想要支持的标签"); 
} 

// --------------------  获取表格总行数  -------------------- // 
function getRowCount()     
{ 
    return m_objTable.rows.length; 
} 

// --------------------  获取表格总列数  -------------------- // 
//取得最大列数 
function getCellCount()     
{ 
    return m_objTable.rows( getRowCount() - 1 ).cells.length; 
} 

// --------------------  获取某行的总列数  -------------------- // 

function getRowCellCount(intRowIndex)     
{ 
    return m_objTable.rows(intRowIndex).cells.length; 
} 

// --------------------  获取开始有标签的行号  -------------------- // 

//获取开始有标签（radio、text等）的行号，主要是为了得到标签命名与行号对应的关系 
//    标签命名规则为英文名称加上数字序号，序号从0开始 
function getStartRow() 
{ 
    var objTd; 
    var strHtml = ""; 
    for( var i = 0;i < getRowCount();i ++ ) 
    { 
        for( var j = 0;j < getCellCount();j ++ ) 
        { 
            if( getRowCellCount(i) <= j ) 
                break; 
            objTd = m_objTable.rows(i).cells(j); 
            strHtml = objTd.innerHTML; 
            for(var m = 0;m < A_TAG_NAME.length;m ++) 
            { 
                if( strHtml.indexOf(A_TAG_NAME[m]) != -1 ) 
                { 
                    return i;     
                } 
            } 
        } 
    } 
}//end getStartRow() 

// ----------------- 获得有标签的最后一行的索引 ----------------- // 

function getEndRow() 
{ 
    var intStart = getRowCount() - 1; 
    for( var i = intStart;i >= 0;i -- ) 
    { 
        for( var j = 0;j < getCellCount();j ++ ) 
        { 
            var strHtml = m_objTable.rows(i).cells(j).innerHTML; 
            for(var m = 0;m < A_TAG_NAME.length;m ++) 
            { 
                if( strHtml.indexOf(A_TAG_NAME[m]) != -1 ) 
                { 
                    return i;     
                } 
            } 
        } 
    } 
}//end getEndRow() 

// ------------------ 获取指定行的相关属性 ------------------ // 

//如各单元格背景色，对齐方式，以及html，放入全局数组中 
//如果有radio，则要替换其name属性 

function getRowProperty(intRowIndex) 
{ 
    var intCellCount    = getCellCount(); 
    m_aRowHtml            = new Array(intCellCount); 
    m_aAlign            = new Array(intCellCount); 
    m_aBgColor            = new Array(intCellCount); 
    m_aHeight            = new Array(intCellCount); 
    var objTd; 
    for(var i = 0;i < intCellCount;i ++) 
    { 
        objTd = m_objTable.rows(intRowIndex).cells(i); 
        m_aAlign[i]        = objTd.align; 
        m_aBgColor[i]    = objTd.bgColor; 
        m_aRowHtml[i]     = objTd.innerHTML; 
        m_aHeight[i]    = objTd.height; 
        if( m_aAlign[i] == "" ) 
            m_aAlign[i] = "left"; 
        if( m_aBgColor[i] == "") 
            m_aBgColor[i] = m_objTable.rows(intRowIndex).bgColor; 
        if( m_aHeight[i] == "") 
            m_aHeight[i] = m_objTable.rows(intRowIndex).height; 
    } 
}//end getRowProperty 

// ----------------------------- 获取新增行的html  ----------------------------- // 

function getNewRowHtml(intRowIndex) 
{ 
    var intCellCount    = getCellCount(); 
    var aStrRowHtml        = new Array(intCellCount); 
    var strOldName = "";                        //radio的起始属性 
    var strNewName = "";                        //给radio赋予的新name 
    var objTd; 
    var objTagList; 
    for( var i = 0;i < intCellCount;i ++ ) 
    { 
        var strHtml =  m_aRowHtml[i]; 
        if(strHtml.toLowerCase().indexOf("radio") != -1) 
        { 
            strNewName = getRandomName(); 
            objTd = m_objTable.rows(intRowIndex).cells(i); 
            objTagList = objTd.getElementsByTagName("INPUT"); 
            strOldName = objTagList[0].name; 
            while(strHtml.indexOf(strOldName) != -1 ) 
            { 
                strHtml = strHtml.replace(strOldName,strNewName); 
            } 
        } 
        aStrRowHtml[i] = strHtml; 
    } 
    return aStrRowHtml; 
} 

// -----------------  获取当前行的索引  ----------------- // 

function getRowIndex() 
{ 
    try 
    {         
        var Elm  =  event.srcElement; 
        while(Elm  &&  Elm.tagName  !=  "TR")   
        {   
            Elm  =  Elm.parentElement;   
        } 
        var intRowIndex = Elm.rowIndex; 
        return intRowIndex; 
    } 
    catch(ex)   
    {   
        alert("getRowIndex() Err  5001:\r\n"  +  ex);   
        m_strError += "getRowIndex() Error" + ex; 
    }   
}//end getRowIndex() method 


// -----------------  获取随机名称  ----------------- // 

function getRandomName() 
{ 
    var strRet = 0; 
    var d = new Date(); 
    strRet = d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString(); 
    return strRet; 
} 
