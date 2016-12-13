<a name="Tree"></a>

## Tree
**Kind**: global class  
**Requires**: <code>module:OG.\*</code>  
**Author:** <a href="mailto:sppark@uengine.org">Seungpil Park</a>  

* [Tree](#Tree)
    * [new Tree(container)](#new_Tree_new)
    * [.init()](#Tree+init)
    * [.getScale()](#Tree+getScale) ⇒ <code>Number</code>
    * [.setScale(scale)](#Tree+setScale)
    * [.setShowLabel(show)](#Tree+setShowLabel)
    * [.drawArea()](#Tree+drawArea)
    * [.clear()](#Tree+clear)
    * [.loadViewData()](#Tree+loadViewData) ⇒ <code>Array</code>
    * [.load()](#Tree+load) ⇒ <code>Array</code>
    * [.loadByFilter(filterData)](#Tree+loadByFilter) ⇒ <code>Array</code>
    * [.removeDataByFilter(filterData)](#Tree+removeDataByFilter)
    * [.clearData(preventRender)](#Tree+clearData)
    * [.sortData(prop, positions, desc, preventRender)](#Tree+sortData)
    * [.updateData(data, preventRender)](#Tree+updateData)
    * [.render()](#Tree+render)
    * [.createViewData()](#Tree+createViewData) ⇒ <code>Object</code>
        * [~getViewData(object, depth, parentView, childFromParent)](#Tree+createViewData..getViewData)
    * [.createStandaloneViewData(mapping, targetActivityView)](#Tree+createStandaloneViewData) ⇒ <code>Object</code>
    * [.renderViews()](#Tree+renderViews)
    * [.labelSubstring(label)](#Tree+labelSubstring) ⇒ <code>String</code>
    * [.updateImageShapeStatus(view, element)](#Tree+updateImageShapeStatus)
        * [~applyPathStyle($svg, color, stroke)](#Tree+updateImageShapeStatus..applyPathStyle)
    * [.drawMappingLabel(view)](#Tree+drawMappingLabel)
    * [.updateMappingLabel(view, element, customData)](#Tree+updateMappingLabel)
    * [.updateActivity(view, element)](#Tree+updateActivity)
    * [.drawActivity(view)](#Tree+drawActivity)
    * [.updateFolder(view, element)](#Tree+updateFolder)
    * [.drawFolder(view)](#Tree+drawFolder)
    * [.updateEd(view, element)](#Tree+updateEd)
    * [.drawEd(view)](#Tree+drawEd)
    * [.drawMappingLine(view)](#Tree+drawMappingLine)
    * [.updateExpanderLine(view, element)](#Tree+updateExpanderLine)
    * [.drawExpanderLine(view)](#Tree+drawExpanderLine)
    * [.updateActivityRelLine(view, element)](#Tree+updateActivityRelLine)
    * [.drawActivityRelLine(view)](#Tree+drawActivityRelLine)
    * [.updateExpander(view, element)](#Tree+updateExpander)
    * [.drawExpander(view)](#Tree+drawExpander)
    * [.getExpanderCenterX(position, depth, standardX)](#Tree+getExpanderCenterX) ⇒ <code>Number</code>
    * [.getShapeCenterX(position, depth, standardX)](#Tree+getShapeCenterX) ⇒ <code>Number</code>
    * [.getMappingEdgeVertices(depth, parentY, myY, pStandardX, myStandardX, hasChild)](#Tree+getMappingEdgeVertices) ⇒ <code>Array</code>
    * [.getActivityRelVertices(position, depth, standardX, parentY, myY)](#Tree+getActivityRelVertices) ⇒ <code>Array</code>
    * [.getExpanderToVertices(position, depth, standardX, parentY, myY)](#Tree+getExpanderToVertices) ⇒ <code>Array</code>
    * [.getExpanderFromVertices(position, depth, standardX, parentY, myY)](#Tree+getExpanderFromVertices) ⇒ <code>Array</code>
    * [.dividedViewsByPosition(displayViews)](#Tree+dividedViewsByPosition) ⇒ <code>Object</code>
    * [.reRangeAreaSize(viewData)](#Tree+reRangeAreaSize)
    * [.fitToBoundary(element, offset[upper,low,left,right)](#Tree+fitToBoundary) ⇒ <code>element</code>
    * [.selectActivityByPosition(position)](#Tree+selectActivityByPosition) ⇒ <code>Array</code>
    * [.selectNextActivity(id)](#Tree+selectNextActivity) ⇒ <code>Object</code>
    * [.selectPrevActivity(id)](#Tree+selectPrevActivity) ⇒ <code>Object</code>
    * [.selectNextActivities(id)](#Tree+selectNextActivities) ⇒ <code>Array</code>
    * [.selectChildById(id)](#Tree+selectChildById) ⇒ <code>Array</code>
    * [.selectChildMapping(sourceId, targetId)](#Tree+selectChildMapping) ⇒ <code>Array</code>
    * [.selectRecursiveChildMapping(sourceId, targetId)](#Tree+selectRecursiveChildMapping) ⇒ <code>Array</code>
    * [.selectParentById(id)](#Tree+selectParentById) ⇒ <code>Object</code>
    * [.selectParentMapping(sourceId, targetId)](#Tree+selectParentMapping) ⇒ <code>Object</code>
    * [.selectById(id)](#Tree+selectById) ⇒ <code>Object</code>
    * [.selectBySourceTarget(sourceId, targetId)](#Tree+selectBySourceTarget) ⇒ <code>Object</code>
    * [.selectMappings()](#Tree+selectMappings) ⇒ <code>Array</code>
    * [.selectRootActivityById(id)](#Tree+selectRootActivityById) ⇒ <code>Object</code>
    * [.selectRootMapping(sourceId, targetId)](#Tree+selectRootMapping) ⇒ <code>Object</code>
    * [.selectRecursiveParentById(id)](#Tree+selectRecursiveParentById) ⇒ <code>Array</code>
    * [.selectRecursiveChildById(id)](#Tree+selectRecursiveChildById) ⇒ <code>Array</code>
    * [.selectRecursiveLastChildById(id)](#Tree+selectRecursiveLastChildById) ⇒ <code>Array</code>
    * [.selectViewById(viewData, id)](#Tree+selectViewById) ⇒ <code>Object</code>
    * [.selectViewByFilter(viewData, filterData)](#Tree+selectViewByFilter) ⇒ <code>Array</code>
    * [.selectRecursiveChildViewsById(viewData, id)](#Tree+selectRecursiveChildViewsById) ⇒ <code>Array</code>
    * [.selectMaxyFromViews(views)](#Tree+selectMaxyFromViews) ⇒ <code>number</code>
    * [.selectMaxDepthFromViews(views)](#Tree+selectMaxDepthFromViews) ⇒ <code>number</code>
    * [.selectMaxBottomFromViews(views)](#Tree+selectMaxBottomFromViews) ⇒ <code>number</code>
    * [.emptyString(value)](#Tree+emptyString) ⇒ <code>boolean</code>
    * [.getElementByPoint(point)](#Tree+getElementByPoint) ⇒ <code>Element</code>
    * [.uuid()](#Tree+uuid) ⇒ <code>string</code>
    * [.bindEvent()](#Tree+bindEvent)
    * [.bindTooltip(element)](#Tree+bindTooltip)
    * [.bindDblClickEvent(element)](#Tree+bindDblClickEvent)
    * [.bindMappingHighLight(element)](#Tree+bindMappingHighLight)
    * [.bindActivityMove()](#Tree+bindActivityMove)
    * [.onBeforeActivityMove(activities)](#Tree+onBeforeActivityMove)
    * [.onActivityMove(activities)](#Tree+onActivityMove)
    * [.bindMappingEvent()](#Tree+bindMappingEvent)
    * [.deleteMapping(data, view)](#Tree+deleteMapping)
    * [.enableShapeContextMenu()](#Tree+enableShapeContextMenu)
    * [.makeShowProperties()](#Tree+makeShowProperties) ⇒ <code>Object</code>
    * [.makeFolder()](#Tree+makeFolder) ⇒ <code>Object</code>
    * [.makeEd()](#Tree+makeEd) ⇒ <code>Object</code>
    * [.makePickEd()](#Tree+makePickEd) ⇒ <code>Object</code>
    * [.makeDelete()](#Tree+makeDelete) ⇒ <code>Object</code>
    * [.makeListRelation()](#Tree+makeListRelation) ⇒ <code>Object</code>
    * [.makeDeleteRelation()](#Tree+makeDeleteRelation) ⇒ <code>Object</code>
    * [.onBeforeMapping(source, target, selectedTargetList)](#Tree+onBeforeMapping) ⇒ <code>boolean</code>
    * [.onMapping(source, target, selectedTargetList)](#Tree+onMapping) ⇒ <code>boolean</code>
    * [.onBeforeDeleteMapping(sourceId, sourceType, targetId, targetType)](#Tree+onBeforeDeleteMapping) ⇒ <code>boolean</code>
    * [.onDeleteMapping(sourceId, sourceType, targetId, targetType)](#Tree+onDeleteMapping) ⇒ <code>boolean</code>

<a name="new_Tree_new"></a>

--------------------------------------------------------------------------------
### new Tree(container)
Open graph Tree Library (OG-Tree)


| Param | Type | Description |
| --- | --- | --- |
| container | <code>String</code> | Dom Element Id |

<a name="Tree+init"></a>

--------------------------------------------------------------------------------
### tree.init()
캔버스를 초기 빌드한다.  최초 1번만 실행된다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+getScale"></a>

--------------------------------------------------------------------------------
### tree.getScale() ⇒ <code>Number</code>
Scale 을 반환한다. (리얼 사이즈 : Scale = 1)

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Number</code> - 스케일값  
<a name="Tree+setScale"></a>

--------------------------------------------------------------------------------
### tree.setScale(scale)
Scale 을 설정한다. (기본 사이즈 : Scale = 1)

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Type | Description |
| --- | --- | --- |
| scale | <code>Number</code> | 스케일값 |

<a name="Tree+setShowLabel"></a>

--------------------------------------------------------------------------------
### tree.setShowLabel(show)
라벨을 숨김/ 보임 처리한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| show | 보임 여부 |

<a name="Tree+drawArea"></a>

--------------------------------------------------------------------------------
### tree.drawArea()
기본 Area 를 생성한다.
lAc,lOut,rIn,rAc,rOut,Canvas

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+clear"></a>

--------------------------------------------------------------------------------
### tree.clear()
캔버스의 모든 화면요소를 삭제한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+loadViewData"></a>

--------------------------------------------------------------------------------
### tree.loadViewData() ⇒ <code>Array</code>
뷰 데이터를 불러온다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - OG-Tree view data  
<a name="Tree+load"></a>

--------------------------------------------------------------------------------
### tree.load() ⇒ <code>Array</code>
노드 데이터를 불러온다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - OG-Tree data  
<a name="Tree+loadByFilter"></a>

--------------------------------------------------------------------------------
### tree.loadByFilter(filterData) ⇒ <code>Array</code>
노드 데이터를 필터링하여 불러온다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| filterData | json |

<a name="Tree+removeDataByFilter"></a>

--------------------------------------------------------------------------------
### tree.removeDataByFilter(filterData)
노드 데이터를 필터링 하여 삭제한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| filterData | json |

<a name="Tree+clearData"></a>

--------------------------------------------------------------------------------
### tree.clearData(preventRender)
노드 데이터를 모두 삭제한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| preventRender | 화면 리로드 여부 |

<a name="Tree+sortData"></a>

--------------------------------------------------------------------------------
### tree.sortData(prop, positions, desc, preventRender)
트리의 데이터를 주어진 prop 로 소트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| prop | 소트 키 |
| positions | Array of Area position |
| desc | 역순 여부 |
| preventRender | 화면 리로드 여부 |

<a name="Tree+updateData"></a>

--------------------------------------------------------------------------------
### tree.updateData(data, preventRender)
데이터를 업데이트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| preventRender | 화면 리로드 여부 |

<a name="Tree+render"></a>

--------------------------------------------------------------------------------
### tree.render()
스토리지의 데이터를 기반으로 화면에 렌더링한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+createViewData"></a>

--------------------------------------------------------------------------------
### tree.createViewData() ⇒ <code>Object</code>
스토리지의 데이터를 기반으로 화면에 표현되야 하는 각 객체의 y 좌표를 생성한 ViewData 를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+createViewData..getViewData"></a>

--------------------------------------------------------------------------------
#### createViewData~getViewData(object, depth, parentView, childFromParent)
주어진 객체의 좌표를 생성하여 viewData 에 저장하고, 객체에 자식이 있다면 함수를 반복수행한다.

**Kind**: inner method of <code>[createViewData](#Tree+createViewData)</code>  

| Param |
| --- |
| object |
| depth |
| parentView |
| childFromParent |

<a name="Tree+createStandaloneViewData"></a>

--------------------------------------------------------------------------------
### tree.createStandaloneViewData(mapping, targetActivityView) ⇒ <code>Object</code>
매핑 시킬 아더워크플로우가 없는 인 데이터들로 viewData 를 구성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| mapping | OG-Tree data |
| targetActivityView | OG-Tree view data |

<a name="Tree+renderViews"></a>

--------------------------------------------------------------------------------
### tree.renderViews()
viewData 중에서 실제로 화면에 표현되야 할 객체를 선정하고 각 x 좌표를 책정한다.
선정된 객체들을 화면에 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+labelSubstring"></a>

--------------------------------------------------------------------------------
### tree.labelSubstring(label) ⇒ <code>String</code>
주어진 라벨이 최대 표기 숫자를 넘길 경우 텍스트를 줄인다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>String</code> - fixed label  

| Param | Description |
| --- | --- |
| label | 라벨 |

<a name="Tree+updateImageShapeStatus"></a>

--------------------------------------------------------------------------------
### tree.updateImageShapeStatus(view, element)
이미지 Shape 의 컬러와 스트로크를 스테이터스에 따라 변경한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+updateImageShapeStatus..applyPathStyle"></a>

--------------------------------------------------------------------------------
#### updateImageShapeStatus~applyPathStyle($svg, color, stroke)
svg 의 path 들에 컬러와 stroke 를 적용시킨다.

**Kind**: inner method of <code>[updateImageShapeStatus](#Tree+updateImageShapeStatus)</code>  

| Param |
| --- |
| $svg |
| color |
| stroke |

<a name="Tree+drawMappingLabel"></a>

--------------------------------------------------------------------------------
### tree.drawMappingLabel(view)
매핑시 셀렉트 된 아이템에 S 마크를 붙인다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateMappingLabel"></a>

--------------------------------------------------------------------------------
### tree.updateMappingLabel(view, element, customData)
매핑시 셀렉트 된 아이템의 S 마크를 업데이트 한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |
| customData | OG-Tree data |

<a name="Tree+updateActivity"></a>

--------------------------------------------------------------------------------
### tree.updateActivity(view, element)
액티비티 아이템을 업데이트 한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawActivity"></a>

--------------------------------------------------------------------------------
### tree.drawActivity(view)
액티비티 아이템을 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateFolder"></a>

--------------------------------------------------------------------------------
### tree.updateFolder(view, element)
폴더 아이템을 업데이트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawFolder"></a>

--------------------------------------------------------------------------------
### tree.drawFolder(view)
폴더 아이템을 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateEd"></a>

--------------------------------------------------------------------------------
### tree.updateEd(view, element)
ED 아이템을 업데이트 한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawEd"></a>

--------------------------------------------------------------------------------
### tree.drawEd(view)
ED 아이템을 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+drawMappingLine"></a>

--------------------------------------------------------------------------------
### tree.drawMappingLine(view)
매핑 연결선을 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateExpanderLine"></a>

--------------------------------------------------------------------------------
### tree.updateExpanderLine(view, element)
expander 선연결을 업데이트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawExpanderLine"></a>

--------------------------------------------------------------------------------
### tree.drawExpanderLine(view)
expander 선연결을 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateActivityRelLine"></a>

--------------------------------------------------------------------------------
### tree.updateActivityRelLine(view, element)
액티비티간의 연결선을 업데이트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawActivityRelLine"></a>

--------------------------------------------------------------------------------
### tree.drawActivityRelLine(view)
액티비티간의 연결선을 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+updateExpander"></a>

--------------------------------------------------------------------------------
### tree.updateExpander(view, element)
expander 를 업데이트한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |
| element | OG-Tree Dom Element |

<a name="Tree+drawExpander"></a>

--------------------------------------------------------------------------------
### tree.drawExpander(view)
expander 를 드로잉한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| view | OG-Tree view data |

<a name="Tree+getExpanderCenterX"></a>

--------------------------------------------------------------------------------
### tree.getExpanderCenterX(position, depth, standardX) ⇒ <code>Number</code>
expander 의 센터를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Number</code> - center X 좌표  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |

<a name="Tree+getShapeCenterX"></a>

--------------------------------------------------------------------------------
### tree.getShapeCenterX(position, depth, standardX) ⇒ <code>Number</code>
액티비티, 폴더, Ed 의 센터를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Number</code> - center X 좌표  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |

<a name="Tree+getMappingEdgeVertices"></a>

--------------------------------------------------------------------------------
### tree.getMappingEdgeVertices(depth, parentY, myY, pStandardX, myStandardX, hasChild) ⇒ <code>Array</code>
매핑 연결선의 vertices 를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| depth | 아이템 depth |
| parentY | 매핑 대상 액티비티 Y 좌표 |
| myY | 자신의 Y 좌표 |
| pStandardX | 매핑 대상 액티비티 Area X 좌표 |
| myStandardX | 자신의 Area X 좌표 |
| hasChild | 자식이 있는지 여부 |

<a name="Tree+getActivityRelVertices"></a>

--------------------------------------------------------------------------------
### tree.getActivityRelVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
액티비티간의 연결선의 vertices 를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 연결대상 액티비티 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="Tree+getExpanderToVertices"></a>

--------------------------------------------------------------------------------
### tree.getExpanderToVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
Expander To 선의 vertices 를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 부모 아이템의 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="Tree+getExpanderFromVertices"></a>

--------------------------------------------------------------------------------
### tree.getExpanderFromVertices(position, depth, standardX, parentY, myY) ⇒ <code>Array</code>
Expander From 선의 vertices 를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - vertices  

| Param | Description |
| --- | --- |
| position | Area position |
| depth | 아이템 depth |
| standardX | Area X 좌표 |
| parentY | 부모 아이템의 Y 좌표 |
| myY | 자신의 Y 좌표 |

<a name="Tree+dividedViewsByPosition"></a>

--------------------------------------------------------------------------------
### tree.dividedViewsByPosition(displayViews) ⇒ <code>Object</code>
주어진 views 를 포지션별로 분류하여 리턴한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - HashMap of OG-Tree view data  

| Param | Description |
| --- | --- |
| displayViews | Array of OG-Tree view data |

<a name="Tree+reRangeAreaSize"></a>

--------------------------------------------------------------------------------
### tree.reRangeAreaSize(viewData)
각 Area 의 크기를 책정하고 redraw 한다.
캔버스의 사이즈를 재조정한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |

<a name="Tree+fitToBoundary"></a>

--------------------------------------------------------------------------------
### tree.fitToBoundary(element, offset[upper,low,left,right) ⇒ <code>element</code>
주어진 Boundary 영역 안으로 공간 기하 객체를 적용한다.(이동 & 리사이즈)

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>element</code> - OG-Tree Dom Element  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |
| offset[upper,low,left,right |  |

<a name="Tree+selectActivityByPosition"></a>

--------------------------------------------------------------------------------
### tree.selectActivityByPosition(position) ⇒ <code>Array</code>
주어진 에어리어에 해당하는 액티비티 정보를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| position | Area position |

<a name="Tree+selectNextActivity"></a>

--------------------------------------------------------------------------------
### tree.selectNextActivity(id) ⇒ <code>Object</code>
주어진 id 의 액티비티의 next 액티비티를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="Tree+selectPrevActivity"></a>

--------------------------------------------------------------------------------
### tree.selectPrevActivity(id) ⇒ <code>Object</code>
주어진 id 의 prev 액티비티를 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="Tree+selectNextActivities"></a>

--------------------------------------------------------------------------------
### tree.selectNextActivities(id) ⇒ <code>Array</code>
주어진 id 의 next 액티비티들을 구한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | 액티비티 id |

<a name="Tree+selectChildById"></a>

--------------------------------------------------------------------------------
### tree.selectChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectChildMapping"></a>

--------------------------------------------------------------------------------
### tree.selectChildMapping(sourceId, targetId) ⇒ <code>Array</code>
주어진 소스와 타켓 아이디를 가지는 매핑 데이터의 자식을 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="Tree+selectRecursiveChildMapping"></a>

--------------------------------------------------------------------------------
### tree.selectRecursiveChildMapping(sourceId, targetId) ⇒ <code>Array</code>
주어진 소스와 타겟 아이디를 가지는 매핑 데이터의 자식을 재귀호출하여 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="Tree+selectParentById"></a>

--------------------------------------------------------------------------------
### tree.selectParentById(id) ⇒ <code>Object</code>
주어진 아이디의 부모정보를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectParentMapping"></a>

--------------------------------------------------------------------------------
### tree.selectParentMapping(sourceId, targetId) ⇒ <code>Object</code>
매핑 데이터의 부모 매핑 데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="Tree+selectById"></a>

--------------------------------------------------------------------------------
### tree.selectById(id) ⇒ <code>Object</code>
주어진 아이디의 정보를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectBySourceTarget"></a>

--------------------------------------------------------------------------------
### tree.selectBySourceTarget(sourceId, targetId) ⇒ <code>Object</code>
주어진 소스아이디와 타겟아이디와 일치하는 OG-Tree 데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="Tree+selectMappings"></a>

--------------------------------------------------------------------------------
### tree.selectMappings() ⇒ <code>Array</code>
매핑 데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  
<a name="Tree+selectRootActivityById"></a>

--------------------------------------------------------------------------------
### tree.selectRootActivityById(id) ⇒ <code>Object</code>
주어진 아이디의 루트 액티비티 정보를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectRootMapping"></a>

--------------------------------------------------------------------------------
### tree.selectRootMapping(sourceId, targetId) ⇒ <code>Object</code>
매핑 데이터의 루트를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree data  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id |
| targetId | OG-Tree data id |

<a name="Tree+selectRecursiveParentById"></a>

--------------------------------------------------------------------------------
### tree.selectRecursiveParentById(id) ⇒ <code>Array</code>
주어진 아이디의 부모 일람을 재귀호출하여 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectRecursiveChildById"></a>

--------------------------------------------------------------------------------
### tree.selectRecursiveChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 재귀호출하여 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectRecursiveLastChildById"></a>

--------------------------------------------------------------------------------
### tree.selectRecursiveLastChildById(id) ⇒ <code>Array</code>
주어진 아이디의 자식 데이터를 재귀호출하여, 더이상 자식이 없는 마지막 데이터일 경우의 리스트를 반환한다.
(자기 자신이 마지막 데이터일 경우 자기 자신을 포함하여)

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree data  

| Param | Description |
| --- | --- |
| id | OG-Tree data id |

<a name="Tree+selectViewById"></a>

--------------------------------------------------------------------------------
### tree.selectViewById(viewData, id) ⇒ <code>Object</code>
주어진 아이디에 해당하는 뷰 데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Object</code> - OG-Tree view data id  

| Param | Description |
| --- | --- |
| viewData | Hashmap of OG-Tree view data |
| id | OG-Tree view data id |

<a name="Tree+selectViewByFilter"></a>

--------------------------------------------------------------------------------
### tree.selectViewByFilter(viewData, filterData) ⇒ <code>Array</code>
주어진 필터 조건에 따라 뷰데이터를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree view data  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |
| filterData | HashMap filter data |

<a name="Tree+selectRecursiveChildViewsById"></a>

--------------------------------------------------------------------------------
### tree.selectRecursiveChildViewsById(viewData, id) ⇒ <code>Array</code>
주어진 아이디의 자식 뷰 데이터를 재귀호출하여 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Array</code> - Array of OG-Tree view data  

| Param | Description |
| --- | --- |
| viewData | HashMap of OG-Tree view data |
| id | OG-Tree view data id |

<a name="Tree+selectMaxyFromViews"></a>

--------------------------------------------------------------------------------
### tree.selectMaxyFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 y 를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>number</code> - max Y  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="Tree+selectMaxDepthFromViews"></a>

--------------------------------------------------------------------------------
### tree.selectMaxDepthFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 depth 를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>number</code> - max depth  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="Tree+selectMaxBottomFromViews"></a>

--------------------------------------------------------------------------------
### tree.selectMaxBottomFromViews(views) ⇒ <code>number</code>
주어진 views 중 가장 큰 bottom 을 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>number</code> - max bottom  

| Param | Description |
| --- | --- |
| views | Array of OG-Tree view data |

<a name="Tree+emptyString"></a>

--------------------------------------------------------------------------------
### tree.emptyString(value) ⇒ <code>boolean</code>
주어진 스트링이 빈값인지를 확인한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>boolean</code> - 빈 값 여부  

| Param | Description |
| --- | --- |
| value | String |

<a name="Tree+getElementByPoint"></a>

--------------------------------------------------------------------------------
### tree.getElementByPoint(point) ⇒ <code>Element</code>
좌표값을 포함하는 가장 앞단의 엘리먼트를 반환한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>Element</code> - OG-Tree Dom Element  

| Param | Description |
| --- | --- |
| point | [x,y] 좌표 |

<a name="Tree+uuid"></a>

--------------------------------------------------------------------------------
### tree.uuid() ⇒ <code>string</code>
무작위 랜덤 아이디 생성

**Kind**: instance method of <code>[Tree](#Tree)</code>  
**Returns**: <code>string</code> - 랜덤 아이디  
<a name="Tree+bindEvent"></a>

--------------------------------------------------------------------------------
### tree.bindEvent()
캔버스가 처음 렌더링 될 시 필요한 이벤트들을 바인딩한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+bindTooltip"></a>

--------------------------------------------------------------------------------
### tree.bindTooltip(element)
툴팁 이벤트를 바인딩한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="Tree+bindDblClickEvent"></a>

--------------------------------------------------------------------------------
### tree.bindDblClickEvent(element)
더블클릭 이벤트를 바인딩한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="Tree+bindMappingHighLight"></a>

--------------------------------------------------------------------------------
### tree.bindMappingHighLight(element)
매핑 연결선의 하이라이트 이벤트를 바인딩한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| element | OG-Tree Dom Element |

<a name="Tree+bindActivityMove"></a>

--------------------------------------------------------------------------------
### tree.bindActivityMove()
액티비티의 이동 이벤트를 바인딩한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+onBeforeActivityMove"></a>

--------------------------------------------------------------------------------
### tree.onBeforeActivityMove(activities)
액티비티가 이동되기 전 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| activities | Array of OG-Tree data |

<a name="Tree+onActivityMove"></a>

--------------------------------------------------------------------------------
### tree.onActivityMove(activities)
액티비티가 이동 된 후 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| activities | Array of OG-Tree data |

<a name="Tree+bindMappingEvent"></a>

--------------------------------------------------------------------------------
### tree.bindMappingEvent()
매핑이 이루어졌을 떄의 이벤트를 처리한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+deleteMapping"></a>

--------------------------------------------------------------------------------
### tree.deleteMapping(data, view)
매핑을 해제한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| data | OG-Tree data |
| view | OG-Tree view |

<a name="Tree+enableShapeContextMenu"></a>

--------------------------------------------------------------------------------
### tree.enableShapeContextMenu()
OG Tree Dom Element 에 마우스 우클릭 메뉴를 가능하게 한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeShowProperties"></a>

--------------------------------------------------------------------------------
### tree.makeShowProperties() ⇒ <code>Object</code>
프로퍼티 보기 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeFolder"></a>

--------------------------------------------------------------------------------
### tree.makeFolder() ⇒ <code>Object</code>
폴더 생성 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeEd"></a>

--------------------------------------------------------------------------------
### tree.makeEd() ⇒ <code>Object</code>
ED 생성 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makePickEd"></a>

--------------------------------------------------------------------------------
### tree.makePickEd() ⇒ <code>Object</code>
Pick ED 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeDelete"></a>

--------------------------------------------------------------------------------
### tree.makeDelete() ⇒ <code>Object</code>
삭제 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeListRelation"></a>

--------------------------------------------------------------------------------
### tree.makeListRelation() ⇒ <code>Object</code>
List Relation 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+makeDeleteRelation"></a>

--------------------------------------------------------------------------------
### tree.makeDeleteRelation() ⇒ <code>Object</code>
매핑 삭제 콘텍스트 메뉴를 생성한다.

**Kind**: instance method of <code>[Tree](#Tree)</code>  
<a name="Tree+onBeforeMapping"></a>

--------------------------------------------------------------------------------
### tree.onBeforeMapping(source, target, selectedTargetList) ⇒ <code>boolean</code>
매핑이 이루어지기 전 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data 드래그 한 대상 |
| target | OG-Tree data 드랍 한 대상 |
| selectedTargetList | Array of OG-Tree data 드래그 대상의 하위 요소들 |

<a name="Tree+onMapping"></a>

--------------------------------------------------------------------------------
### tree.onMapping(source, target, selectedTargetList) ⇒ <code>boolean</code>
매핑이 이루어졌을 때의 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| source | OG-Tree data 드래그 한 대상 |
| target | OG-Tree data 드랍 한 대상 |
| selectedTargetList | Array of OG-Tree data 드래그 대상의 하위 요소들 |

<a name="Tree+onBeforeDeleteMapping"></a>

--------------------------------------------------------------------------------
### tree.onBeforeDeleteMapping(sourceId, sourceType, targetId, targetType) ⇒ <code>boolean</code>
매핑을 삭제하기 전 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id 드래그 한 대상 |
| sourceType | "workflow","activity","folder","ed" |
| targetId | OG-Tree data id 드랍 한 대상 |
| targetType | "workflow","activity","folder","ed" |

<a name="Tree+onDeleteMapping"></a>

--------------------------------------------------------------------------------
### tree.onDeleteMapping(sourceId, sourceType, targetId, targetType) ⇒ <code>boolean</code>
매핑을 삭제한 후 이벤트

**Kind**: instance method of <code>[Tree](#Tree)</code>  

| Param | Description |
| --- | --- |
| sourceId | OG-Tree data id 드래그 한 대상 |
| sourceType | "workflow","activity","folder","ed" |
| targetId | OG-Tree data id 드랍 한 대상 |
| targetType | "workflow","activity","folder","ed" |
