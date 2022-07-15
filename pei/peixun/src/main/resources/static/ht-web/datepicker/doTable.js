

/* ------------------------------------------------------------------------------------------------------------- 
*˵      �������������ڶ�̬��Ӻ�ɾ�����֮��(TR)�����������и���ǩ�����Ƶı�ǩ�����Ǳ���е�һ�����б�ǩ���� 
            ʹ��ǰ��ȷ�����������һ�п��������ƣ����Ҹ��еı�ǩ���뵥һ����radio�������������(name)��name���ַ����������������ظ� 
            ��ÿ��ĩβ�ĵ�Ԫ��(TD)�ڱ�����һ��Ӻ�ɾ���еİ�ť�� 
            �ڰ�ť��onclick�¼��зֱ����addRow��delRow�����ڸ��е��������һ�к�ɾ�����С� 
*ʹ�÷������Ƽ�(����һ��ҳ��ֻ����һ���������) 
            (1)initTable(table)            : ��ʼ������贫�ݱ���id��������ڳ�ʼ��ҳ��ʱ������øú����� 
            (2)addRow()��delRow()        : �ֱ����ڡ���ӡ��͡�ɾ������ť��onClick�¼��� 
            (3)setBaseName(aStrName)    : ���ύ��ʱ�����ñ�����и��б�ǩ������(�������ҵı�ǩ��)������Ϊһ���� 
            (4)getCount()                : ���ύ��ʱ,��ȡ����б�ǩ���������� 
                                            �����û����õ�ĳ����ǩnameֵΪ"txt"��������и��еı�ǩnameֵ 
                                            �������½���Ϊ"txt_0","txt_1"...��ֱ��"txt_getCount()-1" 
            ���һ��ҳ����Ҫ���������������淽�� 
            (1)addRow(table)��delRow(table)         
                �ֱ����ڡ���ӡ��͡�ɾ������ť��onClick�¼��У��ڵ��ú���ʱ���봫�ݱ��id������� 
            (2)setTable(table),setBaseName(aStrName)��getCount() 
                �ύ��ʱ���ֱ����ñ���id��������Լ���ǩ�����������ܵõ���������б�ǩ�������� 
*��    �ߣ������� 
*��    �ڣ�2004��10��13�� 
*��    ʾ��������������˴���������ȥ��addRow(table)��delRow(table)�����еĵ�һ��ע�ͣ��Լ�顣 
*��    ע��Ŀǰ֧�ֵı�ǩ��"INPUT","TEXTAREA","SELECT"�� 
            ���Ҫ֧�ָ����ǩ�����޸�����A_TAG_NAME��initTagValue(objTd)������Ӧ�ط��� 
-------------------------------------------------------------------------------------------------------------- */ 
var m_objTable;                //��Ҫ���ݵı����� 
var m_strError;                //������Ϣ 
var m_aStrTagName;            //��ǩ����Ϊһ�����飬����Ϊ�������� 

var m_aBgColor;                //������Ԫ�񱳾�ɫ������ 
var m_aRowHtml;                //������Ԫ���ڵ�html������ 
var m_aHeight;                //������Ԫ��߶ȣ����� 
var m_aAlign;                //����Ԫ��ˮƽ���뷽ʽ 

//����֧�ֵı�ǩ 
var A_TAG_NAME = new Array("INPUT","TEXTAREA","SELECT"); 


// ----------------------  ��ʼ�����  ---------------------- // 

function initTable(table) 
{ 
    if( typeof(table) == "undefined" ) 
    { 
        alert("�봫����������������id��"); 
        return; 
    } 
    setTable(table);     
    getRowProperty(getStartRow());        //��ȡ�е�������� 
}//end initTable(table) 


// -------------------  ���ñ��id���߱����� ------------------- // 
//������ô˺������ã������addRow��delRow����ʱ�������� 

function setTable(table)           
{ 
    if(typeof(table) == "string") 
        this.m_objTable = getObjTableByID(table); 
    else if(typeof(table) == "object") 
        this.m_objTable = table; 
} 

// ---------------------- ���ñ������б�ǩ��HTML��ǩ���ĳ�ʼ����  ---------------------- // 

function setBaseName(aStrName) 
{ 
    if(typeof(m_objTable) == "undefined") 
    { 
        alert("��û�����ñ��������id"); 
        return; 
    } 
    m_aStrTagName = aStrName; 
    setTagName(getStartRow(),getEndRow(),0); 
}//end setBaseName 

// ---------------------- ��ȡ��̬�������  ---------------------- // 
//ֻ���ܶ�̬��Ӻ�ɾ�������� 
function getCount() 
{ 
    return (getEndRow() - getStartRow() + 1); 
} 

// ---------------- �ڵ�ǰ�е��·����һ��  ---------------- // 

function addRow(table) 
{ 
    //if(!isParameterTrue(addRow,table))    {alert(m_strError);return;} 
    if( typeof(table) != "undefined" )    initTable(table); 
     
    //�õ���ǰ�е����� 
    var intRowIndex = getRowIndex(); 
    var intNewTrIndex = intRowIndex + 1; 
    var aStrRowHtml = getNewRowHtml(getStartRow()); 
    m_objTable.insertRow(intNewTrIndex); 
     
    //����ǰ�и���Ԫ��innerHTML���������ж�Ӧ�ĸ���Ԫ�� 
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
        //���һ��Ϊ������С�����ɾ���С��İ�ť������Ҫ�����ֵ����������Ҫ 
        if( i != (aStrRowHtml.length - 1)) 
            initTagValue(m_objTable.rows(intNewTrIndex).cells(i)); 
    } 
}//end addRow 

// ---------------------------- ɾ����ǰ��  ---------------------------- // 

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

// -------------------------  ���ݱ��id�õ�������  ------------------------- // 
//�����id�����ڣ��򷵻�null 
function getObjTableByID(tableID) 
{ 
    return document.getElementById(tableID); 
} 

/* ------------------------------------------------------------------------------------------------------ 
*��  �ܣ����ø�����Ԫ���б�ǩ���ƣ�����ָ������ʼ�����õ�ָ���Ľ����� 
*��  ����intStartRow ����ʼҪ�������Ƶı�ǩ���������� 
            intEndRow : ���Ҫ�������Ƶı�ǩ���������� 
            intStartNo : ��ǩ����ʼ��ţ�������� 
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

// ----------------------------------  ����ǩ�����ֵ   ---------------------------------- // 

//���ı������ֵ�������radio��checkbox��ǩ��������checked������Ϊfalse 
//�����select��ǩ����ѡ�е�һ�� 

function initTagValue(objTd) 
{ 
    var strSetValue = ""; 
    var strInputType = "";        //input��ǩ���ͱ���radio��checkbox�� 
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
*��  �ܣ��жϵ��ø�����������Ĳ����Ƿ���ȷ�����õ�������Ϣ������ȷ���������ϢΪ�� 
*��  ����objFunction : ���øú����ĺ����� 
            table �����id���߱����� 
  ------------------------------------------------------------------------------------------------------ */ 
function isParameterTrue(objFunction,table) 
{ 
    m_strError = ""; 
    var bolRet = true; 
    var intParaLen = objFunction.arguments.length; 
    if(intParaLen > 1) 
    { 
        m_strError +=  "�Բ��𣬴���÷����Ĳ�������ֻ��Ϊһ���������id�������\n"; 
        bolRet = false; 
    } 
    if(intParaLen == 1)    {setTable(table);} 
    if(typeof(m_objTable) == "undefined" || m_objTable == null) 
    { 
        m_strError += "Ŀǰ������Ĳ�������ȷ��\n���贫����id���߱�����\n"; 
        bolRet = false; 
    } 
    else 
    {//m_objTableΪnullʱ��ʹ��m_objTable.tagName�д� 
        if(m_objTable.tagName != "TABLE") 
        { 
            m_strError += "�����õĲ������Ǳ���id�������\n"; 
            bolRet = false; 
        } 
    } 
    return bolRet; 
}//end isParameterTrue 

// ---------------  ����ǩ�����涨��Χ��A_TAG_NAME��ʱ�������Ի��� ---------------  // 

function alertTagName() 
{ 
    var strTagName = ""; 
    for(var m = 0;m < A_TAG_NAME.length;m ++) 
        strTagName = strTagName + A_TAG_NAME[m] + ","; 
    strTagName = strTagName.substring(0,strTagName.lastIndexOf(",")) + "."; 
    alert("�Բ���Ŀǰ֧�ֵı�ǩ���ޣ�" + strTagName + "\n������JS�ļ����������Ҫ֧�ֵı�ǩ"); 
} 

// --------------------  ��ȡ���������  -------------------- // 
function getRowCount()     
{ 
    return m_objTable.rows.length; 
} 

// --------------------  ��ȡ���������  -------------------- // 
//ȡ��������� 
function getCellCount()     
{ 
    return m_objTable.rows( getRowCount() - 1 ).cells.length; 
} 

// --------------------  ��ȡĳ�е�������  -------------------- // 

function getRowCellCount(intRowIndex)     
{ 
    return m_objTable.rows(intRowIndex).cells.length; 
} 

// --------------------  ��ȡ��ʼ�б�ǩ���к�  -------------------- // 

//��ȡ��ʼ�б�ǩ��radio��text�ȣ����кţ���Ҫ��Ϊ�˵õ���ǩ�������кŶ�Ӧ�Ĺ�ϵ 
//    ��ǩ��������ΪӢ�����Ƽ���������ţ���Ŵ�0��ʼ 
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

// ----------------- ����б�ǩ�����һ�е����� ----------------- // 

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

// ------------------ ��ȡָ���е�������� ------------------ // 

//�����Ԫ�񱳾�ɫ�����뷽ʽ���Լ�html������ȫ�������� 
//�����radio����Ҫ�滻��name���� 

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

// ----------------------------- ��ȡ�����е�html  ----------------------------- // 

function getNewRowHtml(intRowIndex) 
{ 
    var intCellCount    = getCellCount(); 
    var aStrRowHtml        = new Array(intCellCount); 
    var strOldName = "";                        //radio����ʼ���� 
    var strNewName = "";                        //��radio�������name 
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

// -----------------  ��ȡ��ǰ�е�����  ----------------- // 

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


// -----------------  ��ȡ�������  ----------------- // 

function getRandomName() 
{ 
    var strRet = 0; 
    var d = new Date(); 
    strRet = d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + d.getMilliseconds().toString(); 
    return strRet; 
} 
