<a name="Aras"></a>

## Aras
**Kind**: global class  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [Aras](#Aras)
    * [new Aras(tree)](#new_Aras_new)
    * _instance_
        * [.getWorkflowStructure](#Aras+getWorkflowStructure)
            * [new getWorkflowStructure(wf_id, inout)](#new_Aras+getWorkflowStructure_new)
        * [.tree](#Aras+tree) : <code>Tree</code>
        * [.aras](#Aras+aras) : <code>aras</code>
        * [.thisItem](#Aras+thisItem) : <code>Object</code>
        * [.wfId](#Aras+wfId) : <code>String</code>
        * [.stdYN](#Aras+stdYN) : <code>String</code>
        * [.projectId](#Aras+projectId) : <code>String</code>
        * [.inn](#Aras+inn) : <code>null</code>
        * [.prjMaxDepth](#Aras+prjMaxDepth) : <code>number</code>
        * [.stdMaxDepth](#Aras+stdMaxDepth) : <code>number</code>
        * [.TYPE](#Aras+TYPE) : <code>Object</code>
        * [.iExmL2jsobj(node)](#Aras+iExmL2jsobj) ⇒ <code>Object</code>
        * [.getHtmlParameter(val)](#Aras+getHtmlParameter) ⇒ <code>String</code>
        * [.init()](#Aras+init)
        * [.createBody(params)](#Aras+createBody) ⇒ <code>string</code>
        * [.applyMethod(methodName, body)](#Aras+applyMethod) ⇒ <code>Object</code>
        * [.getUserIdentity()](#Aras+getUserIdentity) ⇒ <code>String</code>
        * [.getUserId()](#Aras+getUserId) ⇒ <code>String</code>
        * [.getWorkflowData(wf_id)](#Aras+getWorkflowData) ⇒ <code>Object</code>
        * [.getItemById(type, id)](#Aras+getItemById) ⇒ <code>Object</code>
        * [.getActivityStructure(activity_id, folder_yn, folder_id, inout)](#Aras+getActivityStructure) ⇒ <code>Object</code>
        * [.getEdParentList(id, ed_yn)](#Aras+getEdParentList) ⇒ <code>Array</code>
        * [.getPickEd(ed_number, ed_name)](#Aras+getPickEd) ⇒ <code>Array</code>
        * [.nodeToJson(xmlNode)](#Aras+nodeToJson) ⇒ <code>Object</code>
        * [.getSchCombo(kind, discLine, discSpec, bg, REL_WF_ID, callback)](#Aras+getSchCombo)
        * [.getCurrentItemId(itemType, id)](#Aras+getCurrentItemId) ⇒ <code>Object</code>
        * [.getItemType(type)](#Aras+getItemType) ⇒ <code>String</code>
        * [.getRelType(sourceType, targetType, inout)](#Aras+getRelType) ⇒ <code>String</code>
        * [.showPropertyWindow(type, id)](#Aras+showPropertyWindow)
        * [.sortActivities(activityIds)](#Aras+sortActivities)
        * [.checkMaxCreateNumber(depth)](#Aras+checkMaxCreateNumber) ⇒ <code>boolean</code>
        * [.createFolder(data, view)](#Aras+createFolder)
        * [.addFolderOutRelation(parentData, parentView, newItem, parentItem, parentType, parentId)](#Aras+addFolderOutRelation)
        * [.createEd(data, view, edType)](#Aras+createEd)
        * [.addFolderEDOutRelation(edItem, parentItem, data, view)](#Aras+addFolderEDOutRelation)
        * [.addPickEDOutRelation(edItems, parentItem, data, view)](#Aras+addPickEDOutRelation)
        * [.deleteOutItem(data, view)](#Aras+deleteOutItem)
        * [.createActivity()](#Aras+createActivity)
        * [.addInRel(source, target, selectedTargetList)](#Aras+addInRel)
        * [.deleteInRel(sourceId, sourceType, targetId, targetType)](#Aras+deleteInRel)
        * [.currentSortOrder()](#Aras+currentSortOrder) ⇒ <code>Object</code>
        * [.createWorkFlowData(resultNodeList, who, inout)](#Aras+createWorkFlowData) ⇒ <code>Array</code>
            * [~getStateColorAndStroke(type, state, isDelay)](#Aras+createWorkFlowData..getStateColorAndStroke) ⇒ <code>Object</code>
            * [~convertDate(dateStr)](#Aras+createWorkFlowData..convertDate) ⇒ <code>\*</code>
            * [~checkDelay(node)](#Aras+createWorkFlowData..checkDelay) ⇒ <code>boolean</code>
        * [.createMyWorkFlowData(resultNodeList, inout)](#Aras+createMyWorkFlowData) ⇒ <code>Array</code>
        * [.createOtherWorkFlowData(resultNodeList)](#Aras+createOtherWorkFlowData) ⇒ <code>Array</code>
        * [.refreshOtherWorkflow(wfId)](#Aras+refreshOtherWorkflow)
        * [.refreshMyWorkFlow()](#Aras+refreshMyWorkFlow)
        * [.refreshOutFolder(data, view)](#Aras+refreshOutFolder)
        * [.syncExpandDataWithTree(data)](#Aras+syncExpandDataWithTree)
    * _inner_
        * [~stateJson](#Aras..stateJson)

<a name="new_Aras_new"></a>

### new Aras(tree)
Aras data Handler


| Param | Type | Description |
| --- | --- | --- |
| tree | <code>Tree</code> | 오픈그래프 트리 라이브러리 |

<a name="Aras+getWorkflowStructure"></a>

### aras.getWorkflowStructure
**Kind**: instance class of <code>[Aras](#Aras)</code>  
<a name="new_Aras+getWorkflowStructure_new"></a>

#### new getWorkflowStructure(wf_id, inout)
WF 하위의 액티비티, 폴더 및 ED 조회

**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| wf_id |  |
| inout | IN/OUT |

<a name="Aras+tree"></a>

### aras.tree : <code>Tree</code>
OG-Tree 객체

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+aras"></a>

### aras.aras : <code>aras</code>
부모페이지의 aras 객체

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+thisItem"></a>

### aras.thisItem : <code>Object</code>
현재의 워크플로우 아이템

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+wfId"></a>

### aras.wfId : <code>String</code>
현재의 워크플로우 아이디

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+stdYN"></a>

### aras.stdYN : <code>String</code>
현재 워크플로우의 스탠다드 모드 여부

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+projectId"></a>

### aras.projectId : <code>String</code>
현재 워크플로우의 프로젝트 아이디

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+inn"></a>

### aras.inn : <code>null</code>
newIOMInnovator 리턴 객체

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+prjMaxDepth"></a>

### aras.prjMaxDepth : <code>number</code>
프로젝트, 폴더 5레벨 까지 enable, ed 는 6레벨까지 가능

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+stdMaxDepth"></a>

### aras.stdMaxDepth : <code>number</code>
스탠다드, 폴더 3레벨 까지 enable, 3레벨 일 경우는 ed 생성 불가

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+TYPE"></a>

### aras.TYPE : <code>Object</code>
아이템 타입 Contants

**Kind**: instance property of <code>[Aras](#Aras)</code>  
<a name="Aras+iExmL2jsobj"></a>

### aras.iExmL2jsobj(node) ⇒ <code>Object</code>
IE 에서 아라스 아이템을 json 으로 변환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - json  

| Param | Description |
| --- | --- |
| node | Aras Item |

<a name="Aras+getHtmlParameter"></a>

### aras.getHtmlParameter(val) ⇒ <code>String</code>
URL 에서 지정된 파라미터의 get 프로퍼티를 가져온다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>String</code> - parameter value  

| Param | Description |
| --- | --- |
| val | url 파라미터 |

<a name="Aras+init"></a>

### aras.init()
아라스 객체를 얻기 위한 init 메소드. 최초 한번 실행한다.
부모 페이지로부터 워크플로우 아이템을 받아와서 적용하고, 부모페이지의 리사이즈 이벤트에 반응해 페이지를 레이아웃을 재구성한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
<a name="Aras+createBody"></a>

### aras.createBody(params) ⇒ <code>string</code>
key value 오브젝트로부터 xml 바디 스트링을 만든다

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>string</code> - body string  

| Param | Description |
| --- | --- |
| params | Object |

<a name="Aras+applyMethod"></a>

### aras.applyMethod(methodName, body) ⇒ <code>Object</code>
주어진 메소드 이름과 body 스트링으로 아라스의 applyMethod 를 호출한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param |
| --- |
| methodName | 
| body | 

<a name="Aras+getUserIdentity"></a>

### aras.getUserIdentity() ⇒ <code>String</code>
현재 접속중인 사용자의 IdentityId 를 반환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>String</code> - identityId  
<a name="Aras+getUserId"></a>

### aras.getUserId() ⇒ <code>String</code>
현재 접속중인 사용자의 아이디를 반환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>String</code> - userId  
<a name="Aras+getWorkflowData"></a>

### aras.getWorkflowData(wf_id) ⇒ <code>Object</code>
워크플로우 데이터를 반환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| wf_id | 워크플로우 아이디 |

<a name="Aras+getItemById"></a>

### aras.getItemById(type, id) ⇒ <code>Object</code>
타입과 아이디와 매칭된 데이터를 반환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param |
| --- |
| type | 
| id | 

<a name="Aras+getActivityStructure"></a>

### aras.getActivityStructure(activity_id, folder_yn, folder_id, inout) ⇒ <code>Object</code>
하나의 폴더 또는 Activity 를 기준으로 하위 폴더와 ED 조회

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param | Description |
| --- | --- |
| activity_id |  |
| folder_yn | Y/N |
| folder_id |  |
| inout | IN / OUT |

<a name="Aras+getEdParentList"></a>

### aras.getEdParentList(id, ed_yn) ⇒ <code>Array</code>
선택한 폴더 또는 ED 를 input 으로 쓰는 워크플로우 - Activity 리스트 조회

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Array</code> - json array  

| Param | Description |
| --- | --- |
| id |  |
| ed_yn | Y/N |

<a name="Aras+getPickEd"></a>

### aras.getPickEd(ed_number, ed_name) ⇒ <code>Array</code>
PICK ED 에 대한 조회 리스트(Project 에서만 필요)

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Array</code> - json array  

| Param |
| --- |
| ed_number | 
| ed_name | 

<a name="Aras+nodeToJson"></a>

### aras.nodeToJson(xmlNode) ⇒ <code>Object</code>
Aras Item 노드를 Json 으로 변환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - json  

| Param |
| --- |
| xmlNode | 

<a name="Aras+getSchCombo"></a>

### aras.getSchCombo(kind, discLine, discSpec, bg, REL_WF_ID, callback)
아더 워크플로우의 셀렉트 박스 리스트의 내용을 구한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param |
| --- |
| kind | 
| discLine | 
| discSpec | 
| bg | 
| REL_WF_ID | 
| callback | 

<a name="Aras+getCurrentItemId"></a>

### aras.getCurrentItemId(itemType, id) ⇒ <code>Object</code>
주어진 아이템의 아이디로 현재 아이템 상태를 조회한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - Aras Item  

| Param |
| --- |
| itemType | 
| id | 

<a name="Aras+getItemType"></a>

### aras.getItemType(type) ⇒ <code>String</code>
주어진 타입으로 아라스 아이템 타입을 구한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>String</code> - itemType  

| Param | Description |
| --- | --- |
| type | "workflow","activity","folder","ed" |

<a name="Aras+getRelType"></a>

### aras.getRelType(sourceType, targetType, inout) ⇒ <code>String</code>
주어진 소스의 타입, 타켓의 타입 , 인아웃 으로 아라스 릴레이션 아이템 타입을 구한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>String</code> - itemType  

| Param | Description |
| --- | --- |
| sourceType | "workflow","activity","folder","ed" |
| targetType | "workflow","activity","folder","ed" |
| inout | "in","out" |

<a name="Aras+showPropertyWindow"></a>

### aras.showPropertyWindow(type, id)
주어진 타입과 아이디로 아라스의 아이템 상세정보창을 띄운다

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| type | "workflow","activity","folder","ed" |
| id |  |

<a name="Aras+sortActivities"></a>

### aras.sortActivities(activityIds)
주어진 액티비티 아이디 배열에 따라 아라스 액티비티 아이템을 소팅한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| activityIds | Array of Aras Activity id |

<a name="Aras+checkMaxCreateNumber"></a>

### aras.checkMaxCreateNumber(depth) ⇒ <code>boolean</code>
주어진 아이템의 depth 로 추가 생성이 가능한지 여부를 반환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>boolean</code> - enable  

| Param |
| --- |
| depth | 

<a name="Aras+createFolder"></a>

### aras.createFolder(data, view)
주어진 OG-Tree 폴더 하위에 신규 아라스 폴더를 생성하는 팝업창을 띄운다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view |

<a name="Aras+addFolderOutRelation"></a>

### aras.addFolderOutRelation(parentData, parentView, newItem, parentItem, parentType, parentId)
주어진 부모 아이템과 자식 아이템(폴더) 사이에 릴레이션을 생성한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| parentData | OG-Tree parent data |
| parentView | OG-Tree parent view data |
| newItem | Aras created folder item |
| parentItem | Aras parent item |
| parentType | "workflow","activity","folder","ed" |
| parentId | Aras parent id |

<a name="Aras+createEd"></a>

### aras.createEd(data, view, edType)
주어진 OG-Tree 폴더 하위에 신규 아라스 ED를 생성하는 팝업창을 띄운다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |
| edType | 'CAD','DHI_C3D_OUTPUT','Document','DHI_IntelliSheet','DHI_ED_KDM' |

<a name="Aras+addFolderEDOutRelation"></a>

### aras.addFolderEDOutRelation(edItem, parentItem, data, view)
주어진 부모 아이템(폴더)과 신규 생성한 자식 아이템(ED) 사이에 릴레이션을 생성한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| edItem | Aras created ED item |
| parentItem | Aras parent Folder item |
| data | OG-Tree parent data |
| view | OG-Tree parent view data |

<a name="Aras+addPickEDOutRelation"></a>

### aras.addPickEDOutRelation(edItems, parentItem, data, view)
주어진 부모 아이템(폴더)과 Pick 된 아이템(ED)들 사이에 DDCL 체크 후 릴레이션을 생성한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| edItems | Array of Picked ED Items |
| parentItem | Aras parent Folder item |
| data | OG-Tree parent data |
| view | OG-Tree parent view data |

<a name="Aras+deleteOutItem"></a>

### aras.deleteOutItem(data, view)
지정된 아웃데이터 아이템(액티비티, 폴더, ED) 과 그 부모간의 릴레이션을 삭제한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |

<a name="Aras+createActivity"></a>

### aras.createActivity()
현재 워크플로우에 액티비티를 생성하는 Aras 팝업을 띄운다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
<a name="Aras+addInRel"></a>

### aras.addInRel(source, target, selectedTargetList)
지정된 마이 워크플로우의 소스와 아더 워크플로우의 타겟간에 릴레이션을 생성한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data (My workflow) |
| target | OG-Tree data (Other workflow) |
| selectedTargetList | Array OG-Tree data (Other workflow) target 의 하위 아이템 데이터 |

<a name="Aras+deleteInRel"></a>

### aras.deleteInRel(sourceId, sourceType, targetId, targetType)
주어진 마이워크플로우 소스아이디와 아더워크플로우 타겟 아이디간의 릴레이션을 삭제한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| sourceId | Aras Item id (My workflow) |
| sourceType | "workflow","activity","folder","ed" |
| targetId | Aras Item id (Other workflow) |
| targetType | "workflow","activity","folder","ed" |

<a name="Aras+currentSortOrder"></a>

### aras.currentSortOrder() ⇒ <code>Object</code>
화면의 소트 메뉴로부터 현재 소트 지정값을 알아온다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Object</code> - key : 소트 키, order : asc/desc  
<a name="Aras+createWorkFlowData"></a>

### aras.createWorkFlowData(resultNodeList, who, inout) ⇒ <code>Array</code>
Aras 의 메소드 리턴값을 오픈그래프 트리 데이터로 변환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |
| who | 마이,아더 워크플로우 여부 other/my |
| inout | 인 데이터, 아웃데이터 여부 in/out |


* [.createWorkFlowData(resultNodeList, who, inout)](#Aras+createWorkFlowData) ⇒ <code>Array</code>
    * [~getStateColorAndStroke(type, state, isDelay)](#Aras+createWorkFlowData..getStateColorAndStroke) ⇒ <code>Object</code>
    * [~convertDate(dateStr)](#Aras+createWorkFlowData..convertDate) ⇒ <code>\*</code>
    * [~checkDelay(node)](#Aras+createWorkFlowData..checkDelay) ⇒ <code>boolean</code>

<a name="Aras+createWorkFlowData..getStateColorAndStroke"></a>

#### createWorkFlowData~getStateColorAndStroke(type, state, isDelay) ⇒ <code>Object</code>
스테이트 컬러를 반환한다. 딜레이 값이 있을 경우 stroke 를 더한다.

**Kind**: inner method of <code>[createWorkFlowData](#Aras+createWorkFlowData)</code>  

| Param |
| --- |
| type | 
| state | 
| isDelay | 

<a name="Aras+createWorkFlowData..convertDate"></a>

#### createWorkFlowData~convertDate(dateStr) ⇒ <code>\*</code>
월/일/년 형식의 데이터를 년월일 형식으로 교체한다.(ex) 20160901)

**Kind**: inner method of <code>[createWorkFlowData](#Aras+createWorkFlowData)</code>  

| Param |
| --- |
| dateStr | 

<a name="Aras+createWorkFlowData..checkDelay"></a>

#### createWorkFlowData~checkDelay(node) ⇒ <code>boolean</code>
딜레이 여부를 반환한다.

**Kind**: inner method of <code>[createWorkFlowData](#Aras+createWorkFlowData)</code>  

| Param |
| --- |
| node | 

<a name="Aras+createMyWorkFlowData"></a>

### aras.createMyWorkFlowData(resultNodeList, inout) ⇒ <code>Array</code>
Aras 메소드 리턴값을 오픈그래프 마이워크플로우 데이터로 변환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |
| inout | 인아웃 여부 |

<a name="Aras+createOtherWorkFlowData"></a>

### aras.createOtherWorkFlowData(resultNodeList) ⇒ <code>Array</code>
Aras 메소드 리턴값을 오픈그래프 아더워크플로우 데이터로 변환한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
**Returns**: <code>Array</code> - json  

| Param | Description |
| --- | --- |
| resultNodeList | Aras 메소드 리턴값의 nodeList |

<a name="Aras+refreshOtherWorkflow"></a>

### aras.refreshOtherWorkflow(wfId)
주어진 아더 워크플로우 아이디로 화면의 아더 워크플로우 트리를 갱신한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| wfId | 아더 워크플로우 아이디 |

<a name="Aras+refreshMyWorkFlow"></a>

### aras.refreshMyWorkFlow()
현재 화면의 마이 워크플로우 트리를 갱신한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  
<a name="Aras+refreshOutFolder"></a>

### aras.refreshOutFolder(data, view)
주어진 마이 워프클로우의 폴더의 하위 요소를 갱신한다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view data |

<a name="Aras+syncExpandDataWithTree"></a>

### aras.syncExpandDataWithTree(data)
주어진 오픈그래프 트리 데이터를 화면에 적용시키기 전에, 폴더의 열고 닫음 상태를 화면과 동기화시킨다.

**Kind**: instance method of <code>[Aras](#Aras)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree array data |

<a name="Aras..stateJson"></a>

### Aras~stateJson
스테이트 정의가 저장되어 있는 파일을 불러온다.

**Kind**: inner property of <code>[Aras](#Aras)</code>  
